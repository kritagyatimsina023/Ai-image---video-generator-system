import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box>
      {/* Header skeleton */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Skeleton
          variant="text"
          width={220}
          height={45}
          sx={{ bgcolor: "rgba(255,255,255,.08)" }}
        />

        <Skeleton
          variant="text"
          width={320}
          height={25}
          sx={{ bgcolor: "rgba(255,255,255,.05)" }}
        />
      </Stack>

      {/* Stats skeleton */}
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
              }}
            >
              <Stack spacing={1}>
                <Skeleton
                  width={100}
                  sx={{ bgcolor: "rgba(255,255,255,.08)" }}
                />

                <Skeleton
                  width={80}
                  height={40}
                  sx={{ bgcolor: "rgba(255,255,255,.08)" }}
                />

                <Skeleton
                  width={140}
                  sx={{ bgcolor: "rgba(255,255,255,.05)" }}
                />
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
