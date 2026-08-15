"use client";
import EmptyState from "@/feature/create/components/EmptyState";
import GeneratedResult from "@/feature/create/components/GeneratedResult";
import GeneratingUI from "@/feature/create/components/GeneratingUI";
import {
  useAutoScroll,
  useGenerationState,
} from "@/feature/create/hooks/useCreate";
import { useCreateStore } from "@/store/useCreateStore";
import { useActionState, useRef } from "react";
import {
  ArrowDownward,
  ImageRounded,
  MovieCreationRounded,
} from "@mui/icons-material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { generateAction } from "../generate.action";
import { GenerateActionState, Generation } from "../generate.types";

import { useRouter } from "next/navigation";

interface createdHomeProps {
  promptData: Generation[];
}

const selectSx = {
  color: "#fff",
  borderRadius: 2,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,.12)",
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(59,130,246,.45)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#3b82f6",
  },

  "& .MuiSelect-icon": {
    color: "#fff",
    right: 10,
    fontSize: 18,
  },
};

// const chipSx = {
//   bgcolor: "rgba(37,99,235,.1)",
//   color: "#93c5fd",
//   border: "1px solid rgba(59,130,246,.2)",
// };

const initialState: GenerateActionState = {
  success: false,
  error: "",
  fieldErrors: {},
  generation: null,
};

const CreateHome = ({ promptData }: createdHomeProps) => {
  const { prompt, type, model, ratio, setPrompt, setType, setModel, setRatio } =
    useCreateStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    generateAction,
    initialState,
  );
  useAutoScroll(containerRef, promptData.length);
  useGenerationState(state);
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* SCROLLABLE RESULTS */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 1, md: 3 },
          // py: { xs: 3, md: 20 },

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,.12)",
            borderRadius: 10,
          },

          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        {isPending ? (
          <GeneratingUI type={type} />
        ) : promptData.length > 0 ? (
          <Stack
            spacing={3}
            sx={{
              maxWidth: 900,
              mx: "auto",
              pt: 13,
            }}
          >
            {promptData.map((item) => (
              <GeneratedResult
                key={item.id}
                type={item.type}
                mediaUrl={item.mediaUrl}
                prompt={item.prompt}
              />
            ))}
          </Stack>
        ) : (
          <EmptyState />
        )}
      </Box>
      {/* FIXED COMPOSER */}
      <Box
        component="form"
        action={formAction}
        sx={{
          flexShrink: 0,
          width: "100%",

          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },

          pb: {
            xs: 1.5,
            md: 2.5,
          },

          pt: 1,

          bgcolor: "#000",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            mx: "auto",

            p: { xs: 1.5, md: 2 },

            borderRadius: 4,
            border: "1px solid rgba(59,130,246,.2)",

            bgcolor: "rgba(4,9,18,.88)",
            backdropFilter: "blur(20px)",

            boxShadow: "0 20px 60px rgba(0,0,0,.5)",
          }}
        >
          {/* Prompt */}
          {state.error && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                // border: "1px solid rgba(239, 68, 68, 0.25)",
                bgcolor: "rgba(239, 68, 68, 0.08)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {state.error}
              </Typography>

              <Button
                variant="contained"
                size="small"
                onClick={() => router.push("/pricing")}
              >
                Buy Credits
              </Button>
            </Box>
          )}
          {/* <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              mb: 1.2,
            }}
          >
            Your Prompt
          </Typography> */}

          <TextField
            fullWidth
            multiline
            name="prompt"
            minRows={2}
            maxRows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: 2.5,
                bgcolor: "rgba(0,0,0,.4)",

                "& fieldset": {
                  borderColor: "rgba(255,255,255,.12)",
                },

                "&:hover fieldset": {
                  borderColor: "rgba(59,130,246,.45)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                  boxShadow: "0 0 0 3px rgba(59,130,246,.1)",
                },
              },

              "& textarea::placeholder": {
                color: "rgba(255,255,255,.3)",
                opacity: 1,
              },
            }}
          />

          {/* Controls */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt: 1.5,
            }}
          >
            {/* Left controls */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                minWidth: 0,
                overflowX: "auto",
              }}
            >
              {/* Type */}
              <FormControl size="small">
                <Select
                  value={type}
                  name="type"
                  onChange={(e: SelectChangeEvent) =>
                    setType(e.target.value as "image" | "video")
                  }
                  IconComponent={ArrowDownward}
                  sx={selectSx}
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
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <ImageRounded fontSize="small" />
                      <span>Image</span>
                    </Stack>
                  </MenuItem>

                  <MenuItem value="video">
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                      }}
                      spacing={1}
                    >
                      <MovieCreationRounded fontSize="small" />
                      <span>Video</span>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Model */}
              <FormControl size="small">
                <Select
                  value={model}
                  name="model"
                  onChange={(e: SelectChangeEvent) =>
                    setModel(e.target.value as "GPT" | "Gemini" | "Claude")
                  }
                  IconComponent={ArrowDownward}
                  sx={selectSx}
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

              {/* Ratio */}
              <FormControl size="small">
                <Select
                  value={ratio}
                  name="ratio"
                  onChange={(e: SelectChangeEvent) =>
                    setRatio(e.target.value as "16:9" | "1:1" | "9:16" | "4:3")
                  }
                  IconComponent={ArrowDownward}
                  sx={selectSx}
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
            </Stack>

            {/* Generate */}
            <Button
              type="submit"
              disabled={isPending}
              startIcon={<AutoAwesomeRoundedIcon />}
              variant="contained"
              sx={{
                minWidth: { xs: 100, sm: 150 },
                minHeight: 40,
                flexShrink: 0,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,

                background: "linear-gradient(135deg, #1688ff, #2563eb)",

                boxShadow: "0 8px 28px rgba(37,99,235,.28)",
              }}
            >
              {isPending ? "Generating..." : "Generate"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateHome;
