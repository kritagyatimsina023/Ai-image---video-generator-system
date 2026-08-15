import { AutoAwesomeRounded, ConstructionRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

const GenerationMain = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          textAlign: "center",
          maxWidth: 520,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            display: "grid",
            placeItems: "center",
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(14,165,255,.15), rgba(37,99,235,.12))",
            border: "1px solid rgba(59,130,246,.25)",
            boxShadow: "0 0 40px rgba(37,99,246,.15)",
          }}
        >
          <ConstructionRounded
            sx={{
              fontSize: 34,
              color: "#60a5fa",
            }}
          />
        </Box>

        {/* Heading */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <AutoAwesomeRounded
            sx={{
              fontSize: 22,
              color: "#60a5fa",
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 26,
                md: 32,
              },
              fontWeight: 800,
              letterSpacing: "-.03em",
            }}
          >
            Feature Under Development
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "rgba(255,255,255,.45)",
          }}
        >
          We&apos;re currently working on this feature. It will be available
          soon with more powerful tools and capabilities.
        </Typography>

        {/* Status */}
        <Box
          sx={{
            px: 2,
            py: 0.8,
            borderRadius: 10,
            background: "rgba(37,99,235,.08)",
            border: "1px solid rgba(59,130,246,.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#60a5fa",
            }}
          >
            Coming Soon
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default GenerationMain;
