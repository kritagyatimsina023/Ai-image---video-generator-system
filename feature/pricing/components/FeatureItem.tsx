import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export const FeatureItem = ({
  text,
  accent,
}: {
  text: string;
  accent: string;
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
      }}
      spacing={1}
    >
      <CheckCircleOutlineRounded
        sx={{
          fontSize: 17,
          flexShrink: 0,
          color: accent,
        }}
      />

      <Typography
        sx={{
          color: "rgba(255,255,255,.62)",
          fontSize: 12,
          lineHeight: 1.4,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};
