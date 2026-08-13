"use client";

import { useModel } from "@/store/useModel";
import {
  CloseRounded,
  CreditCardRounded,
  RemoveRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useTransition } from "react";
import { deductCredits } from "../../actions/credits/credits.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeductCreditDialog = () => {
  const [amount, setAmount] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    selectedUser: user,
    isDeductOpen: open,
    closeDeductModal,
  } = useModel();

  const creditAmount = Number(amount);
  const isInvalid =
    !creditAmount || creditAmount <= 0 || !user || creditAmount > user.credits;

  const handleClose = () => {
    if (isPending) return;

    setAmount("");
    // onClose();
  };

  const handleSubmit = () => {
    if (!user || isInvalid) return;

    startTransition(async () => {
      try {
        const credit = await deductCredits(user.id, creditAmount);
        if (credit.success) {
          setAmount("");
          closeDeductModal();
          router.refresh();
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to add credits");
        }
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#07101f",
            color: "#fff",
            border: "1px solid rgba(239,68,68,.2)",
            borderRadius: 3,
            backgroundImage: "none",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2.5,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                bgcolor: "rgba(239,68,68,.1)",
                border: "1px solid rgba(239,68,68,.2)",
              }}
            >
              <RemoveRounded sx={{ color: "#fca5a5" }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Deduct Credits
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 12,
                  color: "rgba(255,255,255,.4)",
                }}
              >
                Remove credits from this user
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={handleClose}
            disabled={isPending}
            sx={{
              color: "rgba(255,255,255,.5)",
              "&:hover": {
                color: "#fff",
                bgcolor: "rgba(255,255,255,.08)",
              },
            }}
          >
            <CloseRounded />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 2.5 }}>
        {user && (
          <Stack spacing={2.5}>
            {/* User */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {user.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 12,
                  color: "rgba(255,255,255,.4)",
                }}
              >
                {user.email}
              </Typography>

              <Stack
                direction="row"
                spacing={0.7}
                sx={{ mt: 1.5, alignItems: "center" }}
              >
                <CreditCardRounded
                  sx={{
                    fontSize: 16,
                    color: "#60a5fa",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.5)",
                  }}
                >
                  Available credits:
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#bfdbfe",
                  }}
                >
                  {user.credits.toLocaleString()}
                </Typography>
              </Stack>
            </Box>

            {/* Amount */}
            <TextField
              fullWidth
              label="Credits to deduct"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={
                !!amount && (creditAmount <= 0 || creditAmount > user.credits)
              }
              helperText={
                amount && creditAmount > user.credits
                  ? "Cannot deduct more than available credits."
                  : undefined
              }
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: user.credits,
                },
              }}
              sx={textFieldSx}
            />

            {/* Result */}
            {amount && creditAmount > 0 && creditAmount <= user.credits && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(239,68,68,.06)",
                  border: "1px solid rgba(239,68,68,.15)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.45)",
                  }}
                >
                  Remaining credit balance
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fca5a5",
                  }}
                >
                  {(user.credits - creditAmount).toLocaleString()}
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                disabled={isPending}
                sx={secondaryButtonSx}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isPending || isInvalid}
                startIcon={<RemoveRounded />}
                sx={{
                  bgcolor: "#dc2626",
                  "&:hover": {
                    bgcolor: "#b91c1c",
                  },
                }}
              >
                {isPending ? "Deducting..." : "Deduct Credits"}
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

const textFieldSx = {
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,.45)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60a5fa",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "rgba(255,255,255,.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(59,130,246,.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#fca5a5",
  },
};

const secondaryButtonSx = {
  color: "rgba(255,255,255,.65)",
  borderColor: "rgba(255,255,255,.12)",
  "&:hover": {
    borderColor: "rgba(255,255,255,.25)",
  },
};

export default DeductCreditDialog;
