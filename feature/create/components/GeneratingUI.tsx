import { Box, Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const GeneratingUI = ({ type }: { type: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: {
          xs: 320,
          md: 520,
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, rgba(37,99,235,.12), transparent 55%)",
      }}
    >
      {/* Animated blue glow */}
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.25), transparent 70%)",
          filter: "blur(25px)",
          animation: "generationGlow 2s ease-in-out infinite",
          "@keyframes generationGlow": {
            "0%, 100%": {
              transform: "scale(.8)",
              opacity: 0.5,
            },
            "50%": {
              transform: "scale(1.15)",
              opacity: 1,
            },
          },
        }}
      />

      {/* Content */}
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          px: 3,
        }}
      >
        {/* Animated icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            display: "grid",
            placeItems: "center",
            borderRadius: 3,
            background: "rgba(37,99,235,.1)",
            border: "1px solid rgba(59,130,246,.3)",
            boxShadow: `
            0 0 20px rgba(37,99,246,.25),
            inset 0 0 20px rgba(37,99,246,.08)
          `,
            animation: "iconPulse 1.8s ease-in-out infinite",

            "@keyframes iconPulse": {
              "0%, 100%": {
                transform: "scale(1)",
                boxShadow: "0 0 20px rgba(37,99,246,.2)",
              },
              "50%": {
                transform: "scale(1.08)",
                boxShadow: "0 0 40px rgba(37,99,246,.5)",
              },
            },
          }}
        >
          <AutoAwesomeRoundedIcon
            sx={{
              fontSize: 30,
              color: "#60a5fa",
              animation: "iconRotate 3s linear infinite",

              "@keyframes iconRotate": {
                from: {
                  transform: "rotate(0deg)",
                },
                to: {
                  transform: "rotate(360deg)",
                },
              },
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: {
              xs: 17,
              md: 19,
            },
            fontWeight: 700,
            letterSpacing: "-.02em",
          }}
        >
          Creating your {type}...
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "rgba(255,255,255,.4)",
            fontSize: 13,
            maxWidth: 380,
            lineHeight: 1.7,
          }}
        >
          Our AI is turning your prompt into something extraordinary.
        </Typography>

        {/* Loading dots */}
        <Stack
          direction="row"
          spacing={0.7}
          sx={{
            mt: 1,
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#3b82f6",
                animation: "dotPulse 1.4s ease-in-out infinite",
                animationDelay: `${dot * 0.2}s`,

                "@keyframes dotPulse": {
                  "0%, 60%, 100%": {
                    opacity: 0.25,
                    transform: "translateY(0)",
                  },
                  "30%": {
                    opacity: 1,
                    transform: "translateY(-4px)",
                  },
                },
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GeneratingUI;
