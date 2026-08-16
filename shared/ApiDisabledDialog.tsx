"use client";

import {
  AutoAwesomeRounded,
  CloseRounded,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

type ApiDisabledDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ApiDisabledDialog = ({ open, onClose }: ApiDisabledDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#07101f",
            color: "#fff",
            borderRadius: 3,
            border: "1px solid rgba(59,130,246,.2)",
            backgroundImage:
              "linear-gradient(145deg, rgba(15,23,42,.98), rgba(7,16,31,.98))",
            boxShadow: "0 30px 100px rgba(0,0,0,.7)",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {/* HEADER */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                background: "rgba(37,99,235,.1)",
                border: "1px solid rgba(59,130,246,.2)",
              }}
            >
              <AutoAwesomeRounded
                sx={{
                  color: "#60a5fa",
                  fontSize: 25,
                }}
              />
            </Box>

            <IconButton
              onClick={onClose}
              sx={{
                color: "rgba(255,255,255,.45)",

                "&:hover": {
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,.06)",
                },
              }}
            >
              <CloseRounded />
            </IconButton>
          </Stack>

          {/* TITLE */}
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              AI Generation is currently off
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.55)",
              }}
            >
              The AI generation APIs are not currently enabled. The results
              displayed in this workspace are dummy images and videos for
              demonstration purposes.
            </Typography>
          </Box>

          {/* INFO */}
          <Box
            sx={{
              display: "flex",
              gap: 1.2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: "rgba(59,130,246,.06)",
              border: "1px solid rgba(59,130,246,.12)",
            }}
          >
            <InfoOutlined
              sx={{
                fontSize: 18,
                color: "#60a5fa",
                mt: 0.1,
              }}
            />

            <Typography
              sx={{
                fontSize: 12,
                lineHeight: 1.6,
                color: "rgba(255,255,255,.5)",
              }}
            >
              You can still explore the generation interface and preview how the
              application works.
            </Typography>
          </Box>

          {/* ACTION */}
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            sx={{
              height: 42,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(135deg, #1688ff, #2563eb)",
              boxShadow: "0 8px 28px rgba(37,99,235,.25)",
            }}
          >
            Got it
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ApiDisabledDialog;
