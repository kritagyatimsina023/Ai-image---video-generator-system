import { Box } from "@mui/material";
import React from "react";
import { AnalyticsCard } from "./AnalyticsCard";
import {
  AutoAwesomeRounded,
  ImageRounded,
  TrendingUpRounded,
  VideocamRounded,
} from "@mui/icons-material";
interface SummaryProps {
  totalGenerations: number;
  imageCount: number;
  videoCount: number;

  totalChange: number;
  imageChange: number;
  videoChange: number;

  peakHour: number | null;
}
const SummaryCards = ({
  totalGenerations,
  imageCount,
  videoCount,
  totalChange,
  imageChange,
  videoChange,
  peakHour,
}: SummaryProps) => {
  return (
    <Box
      sx={{
        mt: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      <AnalyticsCard
        icon={<AutoAwesomeRounded />}
        label="Total Generations"
        value={totalGenerations.toLocaleString()}
        change={`${totalChange >= 0 ? "+" : ""}${totalChange}%`}
      />

      <AnalyticsCard
        icon={<ImageRounded />}
        label="Images Generated"
        value={imageCount.toLocaleString()}
        change={`${imageChange >= 0 ? "+" : ""}${imageChange}%`}
      />

      <AnalyticsCard
        icon={<VideocamRounded />}
        label="Videos Generated"
        value={videoCount.toLocaleString()}
        change={`${videoChange >= 0 ? "+" : ""}${videoChange}%`}
      />

      <AnalyticsCard
        icon={<TrendingUpRounded />}
        label="Peak Hour"
        value="5 PM"
        change="22 requests"
      />
    </Box>
  );
};

export default SummaryCards;
