import { Box, Skeleton, Stack } from "@mui/material";

const SummaryCardsSkeleton = () => {
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
      {Array.from({ length: 4 }).map((_, index) => (
        <Box
          key={index}
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
            {/* LABEL + VALUE */}
            <Box sx={{ flex: 1 }}>
              <Skeleton
                variant="text"
                width={120}
                height={20}
                sx={{
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />

              <Skeleton
                variant="text"
                width={90}
                height={40}
                sx={{
                  mt: 0.5,
                  bgcolor: "rgba(255,255,255,.08)",
                }}
              />
            </Box>

            {/* ICON */}
            <Skeleton
              variant="rounded"
              width={38}
              height={38}
              sx={{
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,.08)",
              }}
            />
          </Stack>

          {/* CHANGE */}
          <Skeleton
            variant="rounded"
            width={65}
            height={22}
            sx={{
              mt: 2,
              borderRadius: 1,
              bgcolor: "rgba(255,255,255,.06)",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SummaryCardsSkeleton;
