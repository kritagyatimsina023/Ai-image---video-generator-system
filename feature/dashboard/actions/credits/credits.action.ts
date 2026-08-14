"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { connectDB } from "@/lib/Mongodb";
import User from "@/models/User";
import Credit from "@/models/Credits";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { updateTag } from "next/cache";
import Activity from "@/models/Activity";
import { CACHE_TAGS, invalidate } from "@/lib/cache/invalidate";

export const getCreditUsers = unstable_cache(
  async () => {
    await connectDB();

    const users = await User.find({
      role: "user",
    })
      .select("_id name email banned createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const userIds = users.map((user) => user._id);

    const credits = await Credit.find({
      userId: {
        $in: userIds,
      },
    })
      .select("userId credits plan planStartedAt planExpiresAt")
      .lean();

    const creditMap = new Map(
      credits.map((credit) => [
        credit.userId.toString(),
        {
          credits: credit.credits,
          plan: credit.plan,
          planStartedAt: credit.planStartedAt,
          planExpiresAt: credit.planExpiresAt,
        },
      ]),
    );

    return users.map((user) => {
      const userCredit = creditMap.get(user._id.toString());

      return {
        id: user._id.toString(),

        name: user.name,
        email: user.email,

        banned: user.banned,

        credits: userCredit?.credits ?? 0,

        plan: userCredit?.plan ?? "free",

        planStartedAt: userCredit?.planStartedAt?.toISOString() ?? null,

        planExpiresAt: userCredit?.planExpiresAt?.toISOString() ?? null,

        createdAt: user.createdAt.toISOString(),
      };
    });
  },
  ["admin-credit-users"],
  {
    tags: ["admin-credit-users"],
  },
);

// export const getCreditUsers = async () => {
//   await connectDB();

//   const users = await User.find({
//     role: "user",
//   })
//     .select("_id name email banned createdAt")
//     .sort({ createdAt: -1 })
//     .lean();

//   const userIds = users.map((user) => user._id);

//   const credits = await Credit.find({
//     userId: {
//       $in: userIds,
//     },
//   })
//     .select("userId credits plan planStartedAt planExpiresAt")
//     .lean();

//   const creditMap = new Map(
//     credits.map((credit) => [
//       credit.userId.toString(),
//       {
//         credits: credit.credits,
//         plan: credit.plan,
//         planStartedAt: credit.planStartedAt,
//         planExpiresAt: credit.planExpiresAt,
//       },
//     ]),
//   );

//   return users.map((user) => {
//     const userCredit = creditMap.get(user._id.toString());

//     return {
//       id: user._id.toString(),

//       name: user.name,
//       email: user.email,

//       banned: user.banned,

//       credits: userCredit?.credits ?? 0,

//       plan: userCredit?.plan ?? "free",

//       planStartedAt: userCredit?.planStartedAt?.toISOString() ?? null,

//       planExpiresAt: userCredit?.planExpiresAt?.toISOString() ?? null,

//       createdAt: user.createdAt.toISOString(),
//     };
//   });
// };

export const addCredits = async (userId: string, amount: number) => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("Invalid credit amount");
  }
  await connectDB();
  const user = await User.findById(userId).select("name banned").lean();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.banned) {
    throw new Error("This accound has been banned! Cannot perform action");
  }

  const credit = await Credit.findOneAndUpdate(
    { userId },
    {
      $inc: {
        credits: amount,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
  await Activity.create({
    userId,
    type: "CREDIT_ADDED",
    metaData: {
      amount,
      newBalance: credit.credits,
    },
    description: `Credits added for ${user.name}: +${amount}`,
  });

  invalidate.creditChange();
  return {
    success: true,
    credits: credit.credits,
  };
};

export const deductCredits = async (userId: string, amount: number) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }
  if (!Number.isInteger(amount) || Number(amount) < 0) {
    throw new Error("Invalid credit amount");
  }
  const user = await User.findById(userId).select("banned").lean();
  if (!user) {
    throw new Error("No user found");
  }

  if (user?.banned) {
    throw new Error("This accound has been banned! Cannot perform action");
  }
  await connectDB();
  const credit = await Credit.findOneAndUpdate(
    { userId },
    {
      $inc: {
        credits: -amount,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
  await Activity.create({
    userId,
    type: "CREDIT_DEDUCTED",
    metaData: {
      amount,
      newBalance: credit.credits,
    },
    description: `Credits Deducted for ${user.name}: -${amount}`,
  });
  invalidate.creditChange();
  return {
    success: true,
    credits: credit.credits,
  };
};
