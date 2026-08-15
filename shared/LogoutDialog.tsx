"use client";

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

interface LogoutDialogProps {
  open: boolean;
}

const LogoutDialog = ({ open }: LogoutDialogProps) => {
  return (
    <Dialog
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0,0,0,.75)",
            backdropFilter: "blur(6px)",
          },
        },

        paper: {
          sx: {
            minWidth: 280,
            borderRadius: 3,
            background:
              "linear-gradient(145deg, rgba(15,23,42,.98), rgba(7,16,31,.98))",
            border: "1px solid rgba(59,130,246,.2)",
            boxShadow: "0 25px 80px rgba(0,0,0,.6)",
          },
        },
      }}
    >
      <DialogContent>
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            py: 2,
          }}
        >
          <CircularProgress
            size={38}
            thickness={4}
            sx={{
              color: "#60a5fa",
            }}
          />

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Logging out...
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "rgba(255,255,255,.45)",
              textAlign: "center",
            }}
          >
            Please wait while we securely sign you out.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
