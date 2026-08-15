import { Box, Skeleton, Stack, Typography } from "@mui/material";

const MainChartSkeleton = () => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        background:
          "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
        border: "1px solid rgba(59,130,246,.14)",
        boxShadow: "0 20px 60px rgba(0,0,0,.15)",
      }}
    >
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            Generations per Hour
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 12,
              color: "rgba(255,255,255,.4)",
            }}
          >
            AI generation requests throughout the day.
          </Typography>
        </Box>

        {/* LEGEND */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Skeleton
            variant="circular"
            width={8}
            height={8}
            sx={{
              bgcolor: "rgba(255,255,255,.08)",
            }}
          />

          <Skeleton
            variant="text"
            width={115}
            height={18}
            sx={{
              bgcolor: "rgba(255,255,255,.08)",
            }}
          />
        </Stack>
      </Stack>

      {/* CHART SKELETON */}
      <Box
        sx={{
          mt: 3,
          height: 350,
          position: "relative",
          display: "flex",
        }}
      >
        {/* Y AXIS */}
        <Stack
          sx={{
            width: 35,
            justifyContent: "space-between",
            alignItems: "flex-start",
            pb: 4,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              width={22}
              height={16}
              sx={{
                bgcolor: "rgba(255,255,255,.06)",
              }}
            />
          ))}
        </Stack>

        {/* GRAPH AREA */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            borderLeft: "1px solid rgba(255,255,255,.05)",
          }}
        >
          {/* HORIZONTAL GRID LINES */}
          <Stack
            sx={{
              position: "absolute",
              inset: 0,
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  borderTop: "1px dashed rgba(255,255,255,.05)",
                }}
              />
            ))}
          </Stack>

          {/* FAKE LINE */}
          <Box
            sx={{
              position: "absolute",
              left: "2%",
              right: "2%",
              top: "20%",
              height: "55%",
              opacity: 0.45,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
            >
              <polyline
                points="
                  0,150
                  80,125
                  160,140
                  240,85
                  320,105
                  400,55
                  480,90
                  560,35
                  640,75
                  720,45
                  800,65
                  880,20
                  1000,50
                "
                fill="none"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="4"
              />
            </svg>
          </Box>

          {/* X AXIS LABELS */}
          <Stack
            direction="row"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -30,
              justifyContent: "space-between",
              px: 0.5,
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={28}
                height={16}
                sx={{
                  bgcolor: "rgba(255,255,255,.06)",
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MainChartSkeleton;
