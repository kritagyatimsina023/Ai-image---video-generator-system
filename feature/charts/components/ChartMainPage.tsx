import { Box } from "@mui/material";
import ChartHeader from "./ChartHeader";
import { Suspense } from "react";
import ChartDataPage from "./ChartDataPage";
import SummaryCardsSkeleton from "./SummaryCardSkeleton";
import MainChartSkeleton from "./MainChartSkeleton";
import SecondaryAnalyticsSkeleton from "./SecondaryAnalyticsSkeleton";

type ChartMainProps = {
  searchParams: Promise<{
    range?: string;
  }>;
};

const ChartMainPage = async ({ searchParams }: ChartMainProps) => {
  const params = await searchParams;

  const range =
    params.range === "7d" || params.range === "30d" ? params.range : "24h";

  return (
    <Box>
      <ChartHeader />
      <Suspense
        key={range}
        fallback={
          <>
            <SummaryCardsSkeleton />
            <MainChartSkeleton />
            <SecondaryAnalyticsSkeleton />
          </>
        }
      >
        <ChartDataPage range={range} />
      </Suspense>
    </Box>
  );
};

export default ChartMainPage;
