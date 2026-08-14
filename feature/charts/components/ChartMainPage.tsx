import { Box } from "@mui/material";
import ChartHeader from "./ChartHeader";
import SummaryCards from "./SummaryCards";
import MainChartArea from "./MainChartArea";
import SecondaryAnalytics from "./SecondaryAnalytics";
import { getGenerationAnalytics } from "../chart.action";
import { calculateChange } from "@/helper/SideFunction";

const ChartMainPage = async () => {
  const analytics = await getGenerationAnalytics();
  console.log("analytics", analytics);
  const totalChange = calculateChange(
    analytics.totalGenerations,
    analytics.yesterdayTotalGenerations,
  );

  const imageChange = calculateChange(
    analytics.imageCount,
    analytics.yesterdayImageCount,
  );

  const videoChange = calculateChange(
    analytics.videoCount,
    analytics.yesterdayVideoCount,
  );

  return (
    <Box>
      <ChartHeader />

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
    </Box>
  );
};

export default ChartMainPage;
