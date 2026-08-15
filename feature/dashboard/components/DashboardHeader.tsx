import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const DashboardHeader = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          sm: "center",
        },
        mb: 4,
      }}
    >
      <Box>
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
          Dashboard
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: "rgba(255,255,255,.45)",
          }}
        >
          Monitor your AI Studio platform.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: {
            xs: 2,
            sm: 0,
          },
          alignItems: "center",
        }}
      >
        <AutoAwesomeRounded
          sx={{
            fontSize: 18,
            color: "#60a5fa",
          }}
        />

        <Typography
          sx={{
            fontSize: 13,
            color: "rgba(255,255,255,.5)",
          }}
        >
          Admin Panel
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
