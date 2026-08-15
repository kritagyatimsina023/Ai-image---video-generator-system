"use client";
import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ChartHeader = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentRange = searchParams.get("range") ?? "24h";

  const handleChangeRange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", range);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        gap: 2,
      }}
    >
      <Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <AutoAwesomeRounded
            sx={{
              fontSize: 25,
              color: "#60a5fa",
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              letterSpacing: "-.03em",
            }}
          >
            Generation Analytics
          </Typography>
        </Stack>

        <Typography
          sx={{
            mt: 0.7,
            fontSize: 14,
            color: "rgba(255,255,255,.45)",
          }}
        >
          Monitor AI generation activity across your platform.
        </Typography>
      </Box>
      {/* TIME FILTER */}
      <Select
        value={currentRange}
        onChange={(event) => handleChangeRange(event.target.value)}
        size="small"
        sx={{
          minWidth: 130,
          color: "#fff",
          borderRadius: 2,
          background: "rgba(15,23,42,.8)",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(59,130,246,.18)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(59,130,246,.35)",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563eb",
          },

          "& .MuiSvgIcon-root": {
            color: "rgba(255,255,255,.5)",
          },
        }}
      >
        <MenuItem value="24h">Last 24 hours</MenuItem>
        <MenuItem value="7d">Last 7 days</MenuItem>
        <MenuItem value="30d">Last 30 days</MenuItem>
      </Select>
    </Stack>
  );
};

export default ChartHeader;
