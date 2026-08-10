"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { ArrowDownward } from "@mui/icons-material";
import { ArrowDownwardRounded } from "@mui/icons-material";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateStore } from "@/store/useCreateStore";

const Homepage = () => {
  const {
    prompt,
    type,
    model,
    ratio,
    setPrompt,
    setType,
    setModel,
    setRatio,
    setVideo,
  } = useCreateStore();
  const router = useRouter();
  const handleGenerate = () => {
    setVideo("Video data");
    router.push("/create");
    if (!prompt.trim()) return;
    console.log({ prompt, type, model, ratio });
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#000",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* <CssBaseline /> */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 50% 8%, rgba(30, 110, 255, 0.16), transparent 28%),
            radial-gradient(circle at 8% 35%, rgba(0, 102, 255, 0.10), transparent 25%),
            radial-gradient(circle at 92% 42%, rgba(37, 99, 235, 0.09), transparent 25%),
            linear-gradient(180deg, #000 0%, #02050b 55%, #000 100%)
          `,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: { xs: 420, md: 1500 },
          height: { xs: 420, md: 1000 },
          top: { xs: -180, md: -430 },
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          border: "1px solid rgba(37, 135, 255, 0.75)",
          boxShadow: `
      0 0 4px rgba(37, 135, 255, 1),
      0 0 12px rgba(37, 135, 255, 0.85),
      0 0 30px rgba(37, 135, 255, 0.55),
      0 0 60px rgba(37, 135, 255, 0.25),
      0 0 100px rgba(37, 135, 255, 0.10),
      inset 0 0 4px rgba(37, 135, 255, 0.9),
      inset 0 0 12px rgba(37, 135, 255, 0.6),
      inset 0 0 30px rgba(37, 135, 255, 0.2)
    `,
          animation: "ping 5s ease-in-out infinite",
          "@keyframes ping": {
            "0%, 100%": {
              opacity: 0.3,
              transform: "translateX(-50%) scale(1)",
            },
            "50%": {
              opacity: 0.76,
              transform: "translateX(-50%) scale(1.025)",
            },
          },
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 70,
          width: { xs: 20, md: 5 },
          height: { xs: 20, md: 5 },
          top: { xs: -180, md: "30%" },
          left: "10%",
          borderRadius: "50%",
          transform: "translateX(-50%)",
          border: "1px solid rgba(37, 135, 255, 0.75)",
          fill: "rgba(37, 135, 255, 0.75)",
          backgroundColor: "rgba(37, 135, 255, 0.75)",
          opacity: "10",
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          pt: { xs: 9, md: 10 },
          pb: 12,
        }}
      >
        {/* Hero */}
        <Stack
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
          //   textAlign="center"
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              px: 1.6,
              py: 0.75,
              border: "1px solid rgba(59,130,246,.25)",
              borderRadius: 999,
              bgcolor: "rgba(37,99,235,.07)",
              color: "#60a5fa",
              //   mb: 3,
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Create. Imagine. Generate.
            </Typography>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.7rem", sm: "4rem", md: "5.2rem" },
              lineHeight: { xs: 1.04, md: 0.98 },
              fontWeight: 800,
              letterSpacing: "-0.055em",
              maxWidth: 900,
            }}
          >
            Turn your ideas into
            <Box
              component="span"
              sx={{
                display: "block",
                background:
                  "linear-gradient(90deg, #fff 15%, #60a5fa 55%, #2563eb 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              stunning visuals.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              maxWidth: 620,
              color: "rgba(255,255,255,.55)",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.7,
            }}
          >
            Generate images and videos with AI. Describe what you imagine and
            let the models turn your prompt into something real.
          </Typography>

          {/* Prompt generator */}
          <Box
            sx={{
              width: "100%",
              mt: { xs: 5, md: 7 },
              p: { xs: 2, md: 2.5 },
              textAlign: "left",
              border: "1px solid rgba(59,130,246,.28)",
              borderRadius: { xs: 3, md: 4 },
              bgcolor: "rgba(4, 9, 18, .78)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 25px 90px rgba(0,0,0,.65), 0 0 70px rgba(37,99,235,.08)",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,.75)",
                mb: 1.2,
              }}
            >
              Describe what you want to create...
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={7}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A futuristic Kathmandu city at night with neon lights..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  borderRadius: 2.5,
                  bgcolor: "rgba(0,0,0,.42)",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(59,130,246,.45)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 0 3px rgba(59,130,246,.10)",
                  },
                },
                "& textarea::placeholder": {
                  color: "rgba(255,255,255,.3)",
                  opacity: 1,
                },
              }}
            />

            <Stack
              sx={{
                mt: 1.5,
              }}
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              //   mt={1.5}
            >
              <FormControl fullWidth size="small">
                <Select
                  value={type}
                  onChange={(e: SelectChangeEvent) =>
                    setType(e.target.value as "image" | "video")
                  }
                  IconComponent={ArrowDownward}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,.12)",
                    },
                    "& .MuiSelect-icon": {
                      color: "#fff",
                      right: 10,
                      fontSize: 18,
                    },
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        sx: {
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          backgroundImage: "none",
                          backdropFilter: "blur(14px)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          color: "#fff",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="image">
                    <Stack
                      sx={{
                        alignItems: "center",
                      }}
                      direction="row"
                      spacing={1}
                    >
                      <ImageRoundedIcon fontSize="small" />
                      <span>Image</span>
                      {/* <ArrowDownward /> */}
                    </Stack>
                  </MenuItem>
                  <MenuItem value="video">
                    <Stack
                      sx={{
                        alignItems: "center",
                      }}
                      direction="row"
                      spacing={1}
                    >
                      <MovieCreationRoundedIcon fontSize="small" />
                      <span>Video</span>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <Select
                  value={model}
                  onChange={(e: SelectChangeEvent) =>
                    setModel(e.target.value as "GPT" | "Gemini" | "Claude")
                  }
                  IconComponent={ArrowDownward}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,.12)",
                    },

                    "& .MuiSelect-icon": {
                      color: "#fff",
                      right: 10,
                      fontSize: 18,
                    },
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        sx: {
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          backgroundImage: "none",
                          backdropFilter: "blur(14px)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          color: "#fff",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="GPT">GPT</MenuItem>
                  <MenuItem value="Gemini">Gemini</MenuItem>
                  <MenuItem value="Claude">Claude</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <Select
                  value={ratio}
                  onChange={(e: SelectChangeEvent) =>
                    setRatio(e.target.value as "16:9" | "1:1" | "9:16" | "4:3")
                  }
                  IconComponent={ArrowDownward}
                  sx={{
                    color: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,.12)",
                    },

                    "& .MuiSelect-icon": {
                      color: "#fff",
                      right: 10,
                      fontSize: 18,
                    },
                  }}
                  MenuProps={{
                    slotProps: {
                      paper: {
                        sx: {
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          backgroundImage: "none",
                          backdropFilter: "blur(14px)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          color: "#fff",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="16:9">16:9</MenuItem>
                  <MenuItem value="1:1">1:1</MenuItem>
                  <MenuItem value="9:16">9:16</MenuItem>
                  <MenuItem value="4:3">4:3</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                startIcon={<AutoAwesomeRoundedIcon />}
                variant="contained"
                sx={{
                  minWidth: { sm: 150 },
                  minHeight: 40,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1688ff, #2563eb)",
                  boxShadow: "0 8px 28px rgba(37,99,235,.28)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3b9aff, #1d4ed8)",
                    boxShadow: "0 10px 35px rgba(37,99,235,.4)",
                  },
                }}
              >
                Generate
              </Button>
            </Stack>
          </Box>

          {/* Feature highlights */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 5 }}
            sx={{
              mt: 7,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {[
              ["01", "Multiple AI Models"],
              ["02", "Image & Video"],
              ["03", "Fast Generation"],
            ].map(([number, label]) => (
              <Stack
                key={number}
                direction="row"
                spacing={1.2}
                sx={{
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "text-start" },
                }}
                // alignItems="center"
                // justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography
                  sx={{
                    color: "#3b82f6",
                    fontFamily: "monospace",
                    fontSize: 12,
                  }}
                >
                  {number}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "rgba(255,255,255,.58)",
                    fontWeight: 500,
                  }}
                  //   fontSize={13}
                  //   color="rgba(255,255,255,.58)"
                  //   fontWeight={500}
                >
                  {label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Homepage;
