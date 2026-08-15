import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { GenerationType } from "./GenerationType";
import { ImageRounded, VideocamRounded } from "@mui/icons-material";
import { Insight } from "./Insight";
import { formatHour } from "@/helper/SideFunction";
type SecondaryProps = {
  imageCount: number;
  videoCount: number;
  peakHour: number | null;
  mostRequestedType: "image" | "video" | null;
  averageRequestsPerHour: number;
  totalCreditsConsumed: number;
};

const SecondaryAnalytics = ({
  imageCount,
  videoCount,
  peakHour,
  mostRequestedType,
  averageRequestsPerHour,
  totalCreditsConsumed,
}: SecondaryProps) => {
  const totalGeneration = imageCount + videoCount;

  return (
    <Box
      sx={{
        mt: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "1fr 1fr",
        },
        gap: 2,
      }}
    >
      {/* IMAGE / VIDEO */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background:
            "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
          border: "1px solid rgba(59,130,246,.14)",
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          Generation Types
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 12,
            color: "rgba(255,255,255,.4)",
          }}
        >
          Compare image and video generation requests.
        </Typography>

        <Stack spacing={2.5} sx={{ mt: 4 }}>
          <GenerationType
            icon={<ImageRounded />}
            label="Images"
            value={imageCount}
            total={totalGeneration}
          />
          <GenerationType
            icon={<VideocamRounded />}
            label="Videos"
            value={videoCount}
            total={totalGeneration}
          />
        </Stack>
      </Box>

      {/* QUICK INSIGHTS */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background:
            "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
          border: "1px solid rgba(59,130,246,.14)",
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          Generation Insights
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 12,
            color: "rgba(255,255,255,.4)",
          }}
        >
          Quick overview of your platform activity.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Insight label="Peak generation time" value={formatHour(peakHour)} />

          <Insight
            label="Most requested type"
            value={mostRequestedType ?? "No Data"}
          />
          <Insight
            label="Average requests / hour"
            value={`${averageRequestsPerHour}hr` || "0 hr"}
          />
          <Insight
            label="Total credits consumed"
            value={totalCreditsConsumed.toString()}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default SecondaryAnalytics;
