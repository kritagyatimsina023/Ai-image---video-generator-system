import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/Mongodb";
import Generate from "@/models/Generate";
import { unstable_cache } from "next/dist/server/web/spec-extension/unstable-cache";
type GenerationAnalytics = {
  totalGenerations: number;
  imageCount: number;
  videoCount: number;
  hourlyData: {
    hour: number;
    count: number;
  }[];
  peakHour: number | null;
  mostRequestedType: "image" | "video" | null;
  averageRequestsPerHour: number;
  totalCreditsConsumed: number;
  yesterdayTotalGenerations: number;
  yesterdayImageCount: number;
  yesterdayVideoCount: number;
};

export const getGenerationAnalytics = unstable_cache(
  async (): Promise<GenerationAnalytics> => {
    await connectDB();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const startOfYesterday = new Date(startOfDay);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const endOfYesterday = new Date(startOfDay);

    const [
      hourlyGenerations,
      generationType,
      totalGenerations,
      yesterdayTotalGenerations,
      yesterdayImageCount,
      yesterdayVideoCount,
    ] = await Promise.all([
      Generate.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: { $hour: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),

      Generate.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: "$type",
            count: { $sum: 1 },
          },
        },
      ]),

      Generate.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      }),

      Generate.countDocuments({
        createdAt: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      }),

      Generate.countDocuments({
        type: "image",
        createdAt: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      }),

      Generate.countDocuments({
        type: "video",
        createdAt: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      }),
    ]);
    const hourlyMap = new Map(
      hourlyGenerations.map((item) => [item._id, item.count]),
    );

    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: hourlyMap.get(hour) ?? 0,
    }));

    const imageCount =
      generationType.find((item) => item._id === "image")?.count ?? 0;
    const videoCount =
      generationType.find((item) => item._id === "video")?.count ?? 0;
    const totalCreditsConsumed = imageCount * 8 + videoCount * 15;

    const peakHour = hourlyData.reduce(
      (max, current) => (current.count > max.count ? current : max),
      { hour: 0, count: 0 },
    );
    const averageRequestPerHour = totalGenerations / 24;

    return {
      totalGenerations,
      imageCount,
      videoCount,
      hourlyData,
      peakHour: peakHour.count > 0 ? peakHour.hour : null,
      mostRequestedType:
        imageCount === 0 && videoCount === 0
          ? null
          : imageCount >= videoCount
            ? "image"
            : "video",

      averageRequestsPerHour:
        totalGenerations > 0 ? Number((totalGenerations / 24).toFixed(1)) : 0,
      totalCreditsConsumed,
      yesterdayTotalGenerations,
      yesterdayImageCount,
      yesterdayVideoCount,
    };
  },
  ["generation-analytics"],
  { tags: ["generation-analytics"] },
);
