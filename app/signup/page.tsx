"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  AutoAwesomeRounded,
  EmailOutlined,
  LockOutlined,
  PersonOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signupAction } from "@/feature/auth/actions/signup.action";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    borderRadius: 2.5,
    background: "rgba(0,0,0,.35)",

    "& fieldset": {
      borderColor: "rgba(255,255,255,.12)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(59,130,246,.45)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59,130,246,.08)",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,.4)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60a5fa",
  },

  "& input::placeholder": {
    color: "rgba(255,255,255,.25)",
    opacity: 1,
  },
};
const initialState = {
  error: "",
  fieldErrors: {},
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        py: 8,
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.16), transparent 65%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={4} sx={{ alignItems: "center" }}>
          {/* Branding */}
          <Stack spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 58,
                height: 58,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                background: "rgba(37,99,235,.1)",
                border: "1px solid rgba(59,130,246,.25)",
                boxShadow: "0 0 40px rgba(37,99,235,.15)",
              }}
            >
              <AutoAwesomeRounded
                sx={{
                  fontSize: 28,
                  color: "#60a5fa",
                }}
              />
            </Box>

            <Typography
              sx={{
                color: "#60a5fa",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".12em",
              }}
            >
              AI CREATION STUDIO
            </Typography>
          </Stack>

          {/* Heading */}
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "2.5rem",
                },
                fontWeight: 800,
                letterSpacing: "-.04em",
              }}
            >
              Start creating.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
              }}
            >
              Create your account and bring your ideas to life.
            </Typography>
          </Stack>

          {/* Form */}
          <Box
            component="form"
            action={formAction}
            sx={{
              width: "100%",
              p: {
                xs: 2.5,
                sm: 4,
              },
              borderRadius: 4,
              border: "1px solid rgba(59,130,246,.18)",
              bgcolor: "rgba(4,9,18,.78)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 80px rgba(0,0,0,.4)",
            }}
          >
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                name="name"
                label="Full name"
                placeholder="Your name"
                sx={inputSx}
                error={!!state.fieldErrors?.name}
                helperText={state.fieldErrors?.name?.[0]}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineOutlined
                          sx={{
                            color: "rgba(255,255,255,.35)",
                            fontSize: 20,
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                name="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
                sx={inputSx}
                error={!!state.fieldErrors?.email}
                helperText={state.fieldErrors?.email?.[0]}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined
                          sx={{
                            color: "rgba(255,255,255,.35)",
                            fontSize: 20,
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                sx={inputSx}
                error={!!state.fieldErrors?.password}
                helperText={state.fieldErrors?.password?.[0]}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined
                          sx={{
                            color: "rgba(255,255,255,.35)",
                            fontSize: 20,
                          }}
                        />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{
                            color: "rgba(255,255,255,.4)",
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {state.error && (
                <Typography
                  sx={{
                    color: "#f87171",
                    fontSize: 13,
                  }}
                >
                  {state.error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={isPending}
                variant="contained"
                sx={{
                  minHeight: 48,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1688ff, #2563eb)",
                }}
              >
                {isPending ? "Creating account..." : "Create Account"}
              </Button>
            </Stack>

            {/* Login link */}
            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                color: "rgba(255,255,255,.4)",
                fontSize: 13,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "rgba(255,255,255,.2)",
              fontSize: 11,
              textAlign: "center",
            }}
          >
            Create. Generate. Imagine.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
