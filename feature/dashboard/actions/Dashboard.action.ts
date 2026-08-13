"use server";
import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/Mongodb";
import User from "@/models/User";
import Generate from "@/models/Generate";
import Credit from "@/models/Credits";
import Activity from "@/models/Activity";
import { updateTag } from "next/cache";

export const getDashboardStats = unstable_cache(
  async () => {
    await connectDB();
    const [totalUsers, totalCreditsResult, imagesGenerated, videosGenerated] =
      await Promise.all([
        User.countDocuments({ role: "user", banned: false }),
        Credit.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$credits" },
            },
          },
        ]),
        Generate.countDocuments({ type: "image" }),

        Generate.countDocuments({ type: "video" }),
      ]);

    return {
      totalUsers,
      totalCredits: totalCreditsResult[0]?.total ?? 0,
      imagesGenerated,
      videosGenerated,
    };
  },
  ["dashboard-stats"],
  {
    tags: ["dashboard-stats"],
  },
);
export const getRecentActivities = unstable_cache(
  async () => {
    await connectDB();

    const activities = await Activity.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return activities.map((activity) => ({
      id: activity._id.toString(),
      type: activity.type,
      description: activity.description,
      user: activity.userId
        ? {
            id: activity.userId._id.toString(),
            name: activity.userId.name,
            email: activity.userId.email,
          }
        : null,
      metadata: activity.metadata ?? {},
      createdAt: activity.createdAt.toISOString(),
    }));
  },
  ["recent-activities"],
  {
    tags: ["recent-activities"],
  },
);

// export const getDashboardStats = async () => {
//   await connectDB();
//   const [totalUsers, totalCreditsResult, imagesGenerated, videosGenerated] =
//     await Promise.all([
//       User.countDocuments({ role: "user", banned: false }),
//       Credit.aggregate([
//         {
//           $group: {
//             _id: null,
//             total: { $sum: "$credits" },
//           },
//         },
//       ]),
//       Generate.countDocuments({ type: "image" }),

//       Generate.countDocuments({ type: "video" }),
//     ]);

//   return {
//     totalUsers,
//     totalCredits: totalCreditsResult[0]?.total ?? 0,
//     imagesGenerated,
//     videosGenerated,
//   };
// };

// export const getRecentActivities = async () => {
//   await connectDB();

//   const activities = await Activity.find()
//     .populate("userId", "name email")
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .lean();

//   return activities.map((activity) => ({
//     id: activity._id.toString(),
//     type: activity.type,
//     description: activity.description,
//     user: activity.userId
//       ? {
//           id: activity.userId._id.toString(),
//           name: activity.userId.name,
//           email: activity.userId.email,
//         }
//       : null,
//     metadata: activity.metadata ?? {},
//     createdAt: activity.createdAt.toISOString(),
//   }));
// };

export const deleteActivity = async () => {
  await connectDB();
  const result = await Activity.deleteMany({});

  updateTag("recent-activities");

  return {
    success: true,
    deletedCount: result.deletedCount,
  };
};
