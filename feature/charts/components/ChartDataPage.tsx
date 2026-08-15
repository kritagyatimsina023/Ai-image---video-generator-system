import React from "react";
import SummaryCards from "./SummaryCards";
import { calculateChange } from "@/helper/SideFunction";
import { getGenerationAnalytics } from "../chart.action";
import MainChartArea from "./MainChartArea";
import SecondaryAnalytics from "./SecondaryAnalytics";

type ChartAnalyticsProps = {
  range: "24h" | "7d" | "30d";
};

const ChartDataPage = async ({ range }: ChartAnalyticsProps) => {
  const analytics = await getGenerationAnalytics(range);

  const totalChange = calculateChange(
    analytics.totalGenerations,
    analytics.previousTotalGenerations,
  );

  const imageChange = calculateChange(
    analytics.imageCount,
    analytics.previousImageCount,
  );

  const videoChange = calculateChange(
    analytics.videoCount,
    analytics.previousVideoCount,
  );
  return (
    <>
      <SummaryCards
        totalGenerations={analytics.totalGenerations}
        imageCount={analytics.imageCount}
        videoCount={analytics.videoCount}
        totalChange={totalChange}
        imageChange={imageChange}
        videoChange={videoChange}
        peakHour={analytics.peakHour}
      />
      <MainChartArea hourlyData={analytics.hourlyData} />
      <SecondaryAnalytics
        imageCount={analytics.imageCount}
        videoCount={analytics.videoCount}
        peakHour={analytics.peakHour}
        mostRequestedType={analytics.mostRequestedType}
        averageRequestsPerHour={analytics.averageRequestsPerHour}
        totalCreditsConsumed={analytics.totalCreditsConsumed}
      />
      ;
    </>
  );
};

export default ChartDataPage;
