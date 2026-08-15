import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const DashboardStatsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Box
            sx={{
              p: 2.5,
              minHeight: 150,
              borderRadius: 3,
              background:
                "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
              border: "1px solid rgba(59,130,246,.14)",
              boxShadow: "0 20px 60px rgba(0,0,0,.2)",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ flex: 1 }}>
                {/* Title */}
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />

                {/* Value */}
                <Skeleton
                  variant="text"
                  width={90}
                  height={42}
                  sx={{
                    mt: 0.5,
                    bgcolor: "rgba(255,255,255,.1)",
                  }}
                />
              </Box>

              {/* Icon */}
              <Skeleton
                variant="rounded"
                width={38}
                height={38}
                sx={{
                  borderRadius: 2,
                  bgcolor: "rgba(37,99,235,.12)",
                  border: "1px solid rgba(59,130,246,.14)",
                }}
              />
            </Stack>

            {/* Description */}
            <Skeleton
              variant="text"
              width={130}
              height={18}
              sx={{
                mt: 2,
                bgcolor: "rgba(255,255,255,.06)",
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStatsSkeleton;
