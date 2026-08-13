"use client";

import {
  AddRounded,
  CloseRounded,
  CreditCardRounded,
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
import { addCredits } from "../../actions/credits/credits.action";
import { useModel } from "@/store/useModel";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// type AddCreditDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     credits: number;
//   } | null;
//   onSuccess?: () => void;
// };

const AddCreditDialog = () => {
  const [amount, setAmount] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { selectedUser: user, isAddOpen: open, closeAddModal } = useModel();

  const handleClose = () => {
    if (isPending) return;
    closeAddModal();
    setAmount("");
  };

  const handleSubmit = () => {
    if (!user) return;

    const creditAmount = Number(amount);

    if (!creditAmount || creditAmount <= 0) return;

    startTransition(async () => {
      try {
        const credit = await addCredits(user.id, creditAmount);
        setAmount("");
        if (credit.success) {
          router.refresh();
          closeAddModal();
        }
      } catch (error) {
        // console.error("Failed to add credits:", error);
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
            border: "1px solid rgba(59,130,246,.2)",
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
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          direction="row"
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                bgcolor: "rgba(34,197,94,.1)",
                border: "1px solid rgba(34,197,94,.2)",
              }}
            >
              <AddRounded sx={{ color: "#86efac" }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Add Credits
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 12,
                  color: "rgba(255,255,255,.4)",
                }}
              >
                Increase user&apos;s available credits
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
                  fontSize: 16,
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
                  Current credits:
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
              label="Credits to add"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              sx={textFieldSx}
            />

            {/* Result */}
            {amount && Number(amount) > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(34,197,94,.06)",
                  border: "1px solid rgba(34,197,94,.15)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.45)",
                  }}
                >
                  New credit balance
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#86efac",
                  }}
                >
                  {(user.credits + Number(amount)).toLocaleString()}
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
                disabled={isPending || !amount || Number(amount) <= 0}
                startIcon={<AddRounded />}
                sx={{
                  bgcolor: "#2563eb",
                  "&:hover": {
                    bgcolor: "#1d4ed8",
                  },
                }}
              >
                {isPending ? "Adding..." : "Add Credits"}
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
};

const secondaryButtonSx = {
  color: "rgba(255,255,255,.65)",
  borderColor: "rgba(255,255,255,.12)",
  "&:hover": {
    borderColor: "rgba(255,255,255,.25)",
  },
};

export default AddCreditDialog;
