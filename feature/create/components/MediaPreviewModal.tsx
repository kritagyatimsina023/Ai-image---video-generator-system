"use client";

import AppTooltip from "@/shared/AppTooltip";
import { CloseRounded, DownloadRounded } from "@mui/icons-material";

import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";

type MediaPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  mediaUrl: string;
  type: "image" | "video";
  prompt: string;
};

const MediaPreviewModal = ({
  open,
  onClose,
  mediaUrl,
  type,
  prompt,
}: MediaPreviewModalProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(mediaUrl);
      if (!response.ok) {
        throw new Error("Failed to download media");
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `generated-${type}.${type === "image" ? "jpg" : "mp4"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "rgba(4, 9, 18, 0.96)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(59,130,246,.2)",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 30px 100px rgba(0,0,0,.7)",
          },
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Generated {type === "image" ? "Image" : "Video"}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <AppTooltip title={"Download media"}>
            <IconButton
              onClick={handleDownload}
              sx={{
                color: "rgba(255,255,255,.6)",

                "&:hover": {
                  color: "#60a5fa",
                  bgcolor: "rgba(37,99,235,.1)",
                },
              }}
            >
              <DownloadRounded />
            </IconButton>
          </AppTooltip>

          <IconButton
            onClick={onClose}
            sx={{
              color: "rgba(255,255,255,.6)",

              "&:hover": {
                color: "#fff",
                bgcolor: "rgba(255,255,255,.08)",
              },
            }}
          >
            <CloseRounded />
          </IconButton>
        </Stack>
      </Stack>

      {/* Media */}
      <Box
        sx={{
          p: { xs: 1.5, md: 3 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: 300, md: 450 },
          background:
            "radial-gradient(circle, rgba(37,99,235,.08), transparent 65%)",
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
              maxHeight: "75vh",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        ) : (
          <Box
            component="img"
            src={mediaUrl}
            alt={prompt || "Generated image"}
            sx={{
              maxWidth: "100%",
              maxHeight: "65vh",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        )}
      </Box>
      {/* Prompt */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "rgba(255,255,255,.4)",
            mb: 0.5,
          }}
        >
          Prompt
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: "rgba(255,255,255,.8)",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {prompt}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default MediaPreviewModal;
