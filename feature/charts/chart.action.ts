import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/Mongodb";
import Generate from "@/models/Generate";
import { unstable_cache } from "next/cache";

export type AnalyticsRange = "24h" | "7d" | "30d";

const TIMEZONE = "Asia/Kathmandu";

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

  previousTotalGenerations: number;
  previousImageCount: number;
  previousVideoCount: number;
};

const getNepalDateKey = (date: Date) => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

const getNepalHour = (date: Date) => {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(date),
  );
};

const getCachedGenerationAnalytics = unstable_cache(
  async (range: AnalyticsRange): Promise<GenerationAnalytics> => {
    await connectDB();

    const now = new Date();

    let startDate: Date;
    let previousStartDate: Date;
    let previousEndDate: Date;

    if (range === "24h") {
      startDate = new Date(now);
      startDate.setHours(startDate.getHours() - 24);

      previousEndDate = new Date(startDate);

      previousStartDate = new Date(startDate);
      previousStartDate.setHours(previousStartDate.getHours() - 24);
    } else if (range === "7d") {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);

      previousEndDate = new Date(startDate);

      previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 7);
    } else {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);

      previousEndDate = new Date(startDate);

      previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - 30);
    }

    const [
      generations,
      generationType,
      previousTotalGenerations,
      previousImageCount,
      previousVideoCount,
    ] = await Promise.all([
      Generate.find({
        createdAt: {
          $gte: startDate,
          $lt: now,
        },
      })
        .select("createdAt type")
        .lean(),

      Generate.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: now,
            },
          },
        },
        {
          $group: {
            _id: "$type",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      Generate.countDocuments({
        createdAt: {
          $gte: previousStartDate,
          $lt: previousEndDate,
        },
      }),

      Generate.countDocuments({
        type: "image",
        createdAt: {
          $gte: previousStartDate,
          $lt: previousEndDate,
        },
      }),

      Generate.countDocuments({
        type: "video",
        createdAt: {
          $gte: previousStartDate,
          $lt: previousEndDate,
        },
      }),
    ]);

    const totalGenerations = generations.length;

    const imageCount =
      generationType.find((item) => item._id === "image")?.count ?? 0;

    const videoCount =
      generationType.find((item) => item._id === "video")?.count ?? 0;

    let hourlyData: {
      hour: number;
      count: number;
    }[];

    if (range === "24h") {
      const hourlyMap = new Map<number, number>();

      for (const generation of generations) {
        const hour = getNepalHour(new Date(generation.createdAt));

        hourlyMap.set(hour, (hourlyMap.get(hour) ?? 0) + 1);
      }

      hourlyData = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: hourlyMap.get(hour) ?? 0,
      }));
    } else {
      const days = range === "7d" ? 7 : 30;

      const dailyMap = new Map<string, number>();

      for (const generation of generations) {
        const date = new Date(generation.createdAt);

        const key = getNepalDateKey(date);

        dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
      }

      hourlyData = Array.from({ length: days }, (_, index) => {
        const date = new Date(startDate);

        date.setDate(date.getDate() + index);

        const key = getNepalDateKey(date);

        return {
          hour: index,
          count: dailyMap.get(key) ?? 0,
        };
      });
    }

    const peakHour = hourlyData.reduce(
      (max, current) => (current.count > max.count ? current : max),
      {
        hour: 0,
        count: 0,
      },
    );

    const mostRequestedType =
      imageCount === 0 && videoCount === 0
        ? null
        : imageCount >= videoCount
          ? "image"
          : "video";

    const periodHours =
      range === "24h" ? 24 : range === "7d" ? 7 * 24 : 30 * 24;

    const averageRequestsPerHour =
      totalGenerations > 0
        ? Number((totalGenerations / periodHours).toFixed(1))
        : 0;

    const totalCreditsConsumed = imageCount * 8 + videoCount * 15;

    return {
      totalGenerations,

      imageCount,
      videoCount,
      hourlyData,
      peakHour: peakHour.count > 0 ? peakHour.hour : null,
      mostRequestedType,
      averageRequestsPerHour,
      totalCreditsConsumed,
      previousTotalGenerations,
      previousImageCount,
      previousVideoCount,
    };
  },

  ["generation-analytics"],

  {
    tags: ["generation-analytics"],
  },
);

export async function getGenerationAnalytics(range: AnalyticsRange = "24h") {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return getCachedGenerationAnalytics(range);
}
