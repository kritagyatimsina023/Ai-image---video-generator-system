"use client";

import { useQuery } from "@tanstack/react-query";
import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const CreditBalance = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["credits", userId],
    queryFn: async () => {
      const response = await fetch("/api/credits", {
        cache: "no-store",
      });
      console.log(response, "Credit score");
      if (!response.ok) {
        throw new Error("Failed to fetch credits");
      }
      const data = await response.json();
      console.log("Credit Data", data);
      return data;
    },
    enabled: !!userId,
  });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        px: 1.2,
        py: 0.6,
        borderRadius: 2,
        background: "rgba(37, 99, 235, 0.1)",
        border: "1px solid rgba(59, 130, 246, 0.25)",
      }}
    >
      <AutoAwesomeRounded
        sx={{
          fontSize: 17,
          color: "#60a5fa",
        }}
      />

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          color: "#bfdbfe",
        }}
      >
        {isLoading ? "..." : `${data?.credit ?? 0} credits`}
      </Typography>
    </Box>
  );
};

export default CreditBalance;
