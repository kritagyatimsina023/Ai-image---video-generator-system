"use client";

import {
  AutoAwesomeRounded,
  ImageRounded,
  MovieCreationRounded,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

interface EmptyStateProps {
  type?: "image" | "video";
}

const EmptyState = ({ type = "video" }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: {
          xs: 320,
          sm: 430,
          md: 320,
        },
        py: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, rgba(37,99,235,.08), transparent 58%)",
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.12), transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: 3,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 76,
            height: 76,
            display: "grid",
            placeItems: "center",
            borderRadius: 3,
            background:
              "linear-gradient(145deg, rgba(37,99,235,.16), rgba(37,99,235,.05))",
            border: "1px solid rgba(59,130,246,.25)",
            boxShadow: `
              0 0 25px rgba(37,99,246,.12),
              inset 0 0 20px rgba(37,99,246,.05)
            `,
          }}
        >
          {type === "video" ? (
            <MovieCreationRounded
              sx={{
                fontSize: 32,
                color: "#60a5fa",
              }}
            />
          ) : (
            <ImageRounded
              sx={{
                fontSize: 32,
                color: "#60a5fa",
              }}
            />
          )}

          {/* Small sparkle */}
          <AutoAwesomeRounded
            sx={{
              position: "absolute",
              mt: -7,
              ml: 7,
              fontSize: 16,
              color: "#3b82f6",
              opacity: 0.9,
            }}
          />
        </Box>

        {/* Heading */}
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
          Your creation will appear here
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            maxWidth: 430,
            color: "rgba(255,255,255,.4)",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          Describe your idea below and let AI transform your prompt into a
          stunning {type}.
        </Typography>

        {/* Hint */}
        <Box
          sx={{
            mt: 1,
            px: 1.5,
            py: 0.8,
            borderRadius: 1.5,
            background: "rgba(37,99,235,.06)",
            border: "1px solid rgba(59,130,246,.12)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "rgba(147,197,253,.65)",
            }}
          >
            ✦ Enter a prompt to get started
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default EmptyState;
