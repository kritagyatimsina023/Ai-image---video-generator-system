"use server";
import { revalidateTag, unstable_cache } from "next/cache";
import { connectDB } from "@/lib/Mongodb";
import User from "@/models/User";
import Generate from "@/models/Generate";
import Credit from "@/models/Credits";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { updateTag } from "next/cache";
import Activity from "@/models/Activity";
import { invalidate } from "@/lib/cache/invalidate";

export const getUsers = unstable_cache(
  async () => {
    await connectDB();

    const users = await User.find({
      role: "user",
    })
      .select("_id name email role banned createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const userIds = users.map((user) => user._id);

    const [credits, generations] = await Promise.all([
      Credit.find({
        userId: { $in: userIds },
      })
        .select("userId credits")
        .lean(),

      Generate.aggregate([
        {
          $match: {
            userId: { $in: userIds },
          },
        },
        {
          $group: {
            _id: {
              userId: "$userId",
              type: "$type",
            },
            count: {
              $sum: 1,
            },
          },
        },
      ]),
    ]);

    const creditMap = new Map(
      credits.map((credit) => [credit.userId.toString(), credit.credits]),
    );

    const generationMap = new Map<
      string,
      {
        image: number;
        video: number;
      }
    >();

    generations.forEach((item) => {
      const userId = item._id.userId.toString();

      const existing = generationMap.get(userId) ?? {
        image: 0,
        video: 0,
      };

      if (item._id.type === "image") {
        existing.image = item.count;
      }

      if (item._id.type === "video") {
        existing.video = item.count;
      }

      generationMap.set(userId, existing);
    });

    return users.map((user) => {
      const id = user._id.toString();

      const generation = generationMap.get(id) ?? {
        image: 0,
        video: 0,
      };

      return {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
        banned: user.banned,
        credits: creditMap.get(id) ?? 0,
        imagesGenerated: generation.image,
        videosGenerated: generation.video,
        createdAt: user.createdAt.toISOString(),
      };
    });
  },
  ["admin-users"],
  {
    tags: ["admin-users"],
  },
);

// export const getUsers = async () => {
//   await connectDB();

//   const users = await User.find({
//     role: "user",
//   })
//     .select("_id name email role banned createdAt")
//     .sort({ createdAt: -1 })
//     .lean();

//   const userIds = users.map((user) => user._id);

//   const [credits, generations] = await Promise.all([
//     Credit.find({
//       userId: { $in: userIds },
//     })
//       .select("userId credits")
//       .lean(),

//     Generate.aggregate([
//       {
//         $match: {
//           userId: { $in: userIds },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             userId: "$userId",
//             type: "$type",
//           },
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]),
//   ]);

//   const creditMap = new Map(
//     credits.map((credit) => [credit.userId.toString(), credit.credits]),
//   );

//   const generationMap = new Map<
//     string,
//     {
//       image: number;
//       video: number;
//     }
//   >();

//   generations.forEach((item) => {
//     const userId = item._id.userId.toString();

//     const existing = generationMap.get(userId) ?? {
//       image: 0,
//       video: 0,
//     };

//     if (item._id.type === "image") {
//       existing.image = item.count;
//     }

//     if (item._id.type === "video") {
//       existing.video = item.count;
//     }

//     generationMap.set(userId, existing);
//   });

//   return users.map((user) => {
//     const id = user._id.toString();

//     const generation = generationMap.get(id) ?? {
//       image: 0,
//       video: 0,
//     };

//     return {
//       id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       banned: user.banned,
//       credits: creditMap.get(id) ?? 0,
//       imagesGenerated: generation.image,
//       videosGenerated: generation.video,
//       createdAt: user.createdAt.toISOString(),
//     };
//   });
// };

export async function banUser(userId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  await connectDB();
  const user = await User.findByIdAndUpdate(
    {
      _id: userId,
      role: "user",
    },
    {
      $set: {
        banned: true,
      },
    },
    {
      new: true,
    },
  );
  if (!user) {
    throw new Error("User not found");
  }
  await Activity.create({
    userId,
    type: "USER_BANNED",
    metaData: {
      banned: true,
    },
    description: `User ${user.name} has been banned`,
  });
  updateTag("admin-users");
  updateTag("recent-activities");
  return {
    success: true,
  };
}

export async function toggleBanUser(userId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  await connectDB();
  const user = await User.findOne({
    _id: userId,
    role: "user",
  });

  if (!user) {
    throw new Error("User not found");
  }

  user.banned = !user.banned;

  await user.save();
  const activityType = user.banned ? "USER_BANNED" : "USER_UNBANNED";
  await Activity.create({
    userId,
    type: activityType,
    metaData: {
      banned: user.banned,
    },
    description: user.banned
      ? `User ${user.name} has been banned`
      : `User ${user.name} has been unbanned`,
  });
  // updateTag("dashboard-stats");
  // updateTag("admin-users");
  // updateTag("recent-activities");
  invalidate.toggleBanUser();
  return {
    success: true,
    banned: user.banned,
  };
}

// export async function checkBannedUser(userId:string) {

//   if (!currentUser) {
//     return {
//       authenticated: false,
//       banned: false,
//       user: null,
//     };
//   }
//   await connectDB();
//   const user = await User.findById(currentUser.userId)
//     .select("_id name email role banned")
//     .lean();

//   if (!user) {
//     return {
//       authenticated: false,
//       banned: false,
//       user: null,
//     };
//   }

//   return {
//     authenticated: true,
//     banned: user.banned === true,
//     user: {
//       id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     },
//   };
// }
