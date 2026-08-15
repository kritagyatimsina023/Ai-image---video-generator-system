"use client";

import Link from "next/link";
import {
  AutoAwesomeRounded,
  EmailOutlined,
  LockOutlined,
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
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { loginAction } from "@/feature/auth/actions/login.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, {
    error: "",
    fieldErrors: {},
  });
  const router = useRouter();
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
      if (state.hyperLink) return router.push(state.hyperLink);
    }
  }, [state.error, state]);

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

      {/* Decorative grid */}
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
              Welcome back.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.45)",
                fontSize: 14,
              }}
            >
              Sign in to continue creating something extraordinary.
            </Typography>
          </Stack>

          {/* Form */}
          <Box
            component={"form"}
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
                label="Email"
                placeholder="you@example.com"
                type="email"
                name="email"
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
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                error={!!state.fieldErrors?.password}
                helperText={state.fieldErrors?.password?.[0]}
                sx={inputSx}
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

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link
                  href="/forgot-password"
                  style={{
                    color: "#60a5fa",
                    fontSize: 13,
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isPending}
                sx={{
                  minHeight: 48,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1688ff, #2563eb)",
                  boxShadow: "0 8px 28px rgba(37,99,235,.28)",

                  "&:hover": {
                    background: "linear-gradient(135deg, #3b9aff, #1d4ed8)",
                    boxShadow: "0 10px 35px rgba(37,99,235,.4)",
                  },
                }}
              >
                {isPending ? (
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    <Loader2 className="animate-spin" />
                    Signing in
                  </Typography>
                ) : (
                  "Sign in"
                )}
                {/* {isPending ? "Signing in ...." : "Sign in"} */}
              </Button>
            </Stack>

            {/* Signup */}
            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                color: "rgba(255,255,255,.4)",
                fontSize: 13,
              }}
            >
              Dont have an account?{" "}
              <Link
                href="/signup"
                style={{
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Create one
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
            Your creative workspace starts here.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
