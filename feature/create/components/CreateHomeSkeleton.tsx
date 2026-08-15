import { Box, Skeleton, Stack } from "@mui/material";

const CreateHomeSkeleton = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Results area */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          px: { xs: 1, md: 3 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 900,
            mx: "auto",
            pt: 13,
          }}
        >
          <Skeleton
            variant="rounded"
            height={220}
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,.05)",
            }}
          />

          <Skeleton
            variant="rounded"
            height={220}
            sx={{
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,.05)",
            }}
          />
        </Stack>
      </Box>

      {/* Composer */}
      <Box
        sx={{
          flexShrink: 0,
          width: "100%",
          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },
          pb: {
            xs: 1.5,
            md: 2.5,
          },
          pt: 1,
          bgcolor: "#000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            mx: "auto",
            p: { xs: 1.5, md: 2 },
            borderRadius: 4,
            border: "1px solid rgba(59,130,246,.2)",
            bgcolor: "rgba(4,9,18,.88)",
          }}
        >
          {/* Prompt */}
          <Skeleton
            variant="rounded"
            height={90}
            sx={{
              borderRadius: 2.5,
              bgcolor: "rgba(255,255,255,.05)",
            }}
          />

          {/* Controls */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Skeleton
                variant="rounded"
                width={90}
                height={40}
                sx={{
                  bgcolor: "rgba(255,255,255,.05)",
                }}
              />

              <Skeleton
                variant="rounded"
                width={90}
                height={40}
                sx={{
                  bgcolor: "rgba(255,255,255,.05)",
                }}
              />

              <Skeleton
                variant="rounded"
                width={80}
                height={40}
                sx={{
                  bgcolor: "rgba(255,255,255,.05)",
                }}
              />
            </Stack>

            <Skeleton
              variant="rounded"
              width={150}
              height={40}
              sx={{
                borderRadius: 2,
                bgcolor: "rgba(37,99,235,.15)",
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateHomeSkeleton;
