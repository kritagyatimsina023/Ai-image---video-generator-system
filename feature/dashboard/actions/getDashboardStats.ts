import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/Mongodb";
import User from "@/models/User";
import Generate from "@/models/Generate";
import Credit from "@/models/Credits";

export const getDashboardStats = unstable_cache(
  async () => {
    await connectDB();

    const [totalUsers, totalCreditsResult, imagesGenerated, videosGenerated] =
      await Promise.all([
        User.countDocuments({ role: "user" }),

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
