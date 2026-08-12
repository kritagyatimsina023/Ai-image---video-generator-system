import { AutoAwesomeRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import { Box } from "@mui/material";
import React, { useState } from "react";
import { Generation } from "../generate.types";
import MediaPreviewModal from "./MediaPreviewModal";
type GeneratedProps = Pick<Generation, "prompt" | "mediaUrl" | "type">;

const GeneratedResult = ({ prompt, mediaUrl, type }: GeneratedProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <Box
      sx={{
        minHeight: {
          xs: 320,
          md: 520,
        },
        display: "flex",
        alignItems: "start",
        justifyContent: "end",
        background:
          "radial-gradient(circle, rgba(37,99,235,.08), transparent 60%)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "end",
          textAlign: "center",
          px: 3,
          py: 3,
        }}
      >
        {type === "video" ? (
          <Box
            component="video"
            src={mediaUrl}
            controls
            autoPlay
            loop
            muted
            playsInline
            sx={{
              width: "100%",
              maxWidth: 500,
              maxHeight: 520,
              borderRadius: 3,
              objectFit: "contain",
              border: "1px solid rgba(59,130,246,.2)",
              boxShadow: "0 0 50px rgba(37,99,246,.12)",
            }}
          />
        ) : (
          <Box
            component="img"
            src={mediaUrl}
            alt={prompt || "Generated image"}
            onClick={() => setPreviewOpen(true)}
            sx={{
              width: "100%",
              maxWidth: 700,
              maxHeight: 320,
              borderRadius: 3,
              objectFit: "contain",
              border: "1px solid rgba(59,130,246,.2)",
              boxShadow: "0 0 50px rgba(37,99,246,.12)",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "0 0 70px rgba(37,99,246,.25)",
              },
            }}
          />
        )}
        <Typography
          sx={{
            color: "rgba(255,255,255,.4)",
            fontSize: 13,
            textAlign: "end",
          }}
        >
          {prompt}
        </Typography>
      </Stack>
      <MediaPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        mediaUrl={mediaUrl}
        type={type}
        prompt={prompt}
      />
    </Box>
  );
};

export default GeneratedResult;
