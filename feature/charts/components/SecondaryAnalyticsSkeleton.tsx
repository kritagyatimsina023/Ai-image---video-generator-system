import { Box, Skeleton, Stack, Typography } from "@mui/material";

const SecondaryAnalyticsSkeleton = () => {
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
      {/* GENERATION TYPES SKELETON */}
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
          {/* IMAGE */}
          <Box>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={38}
                  height={38}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />

                <Skeleton
                  variant="text"
                  width={65}
                  height={20}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </Stack>

              <Skeleton
                variant="text"
                width={45}
                height={22}
                sx={{
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />
            </Stack>

            <Skeleton
              variant="rounded"
              width="100%"
              height={7}
              sx={{
                mt: 1.5,
                borderRadius: 10,
                bgcolor: "rgba(255,255,255,.06)",
              }}
            />
          </Box>

          {/* VIDEO */}
          <Box>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={38}
                  height={38}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />

                <Skeleton
                  variant="text"
                  width={65}
                  height={20}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </Stack>

              <Skeleton
                variant="text"
                width={45}
                height={22}
                sx={{
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />
            </Stack>

            <Skeleton
              variant="rounded"
              width="100%"
              height={7}
              sx={{
                mt: 1.5,
                borderRadius: 10,
                bgcolor: "rgba(255,255,255,.06)",
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* GENERATION INSIGHTS SKELETON */}
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
          {Array.from({ length: 4 }).map((_, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                borderRadius: 2,
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(255,255,255,.04)",
              }}
            >
              <Skeleton
                variant="text"
                width={145}
                height={20}
                sx={{
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />

              <Skeleton
                variant="rounded"
                width={75}
                height={24}
                sx={{
                  borderRadius: 1.5,
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SecondaryAnalyticsSkeleton;
