import { Box, Typography } from "@mui/material";

export const CreditBox = ({
  icon,
  text,
  accent,
}: {
  icon: React.ReactNode;
  text: string;
  accent: string;
}) => {
  return (
    <Box
      sx={{
        p: 1.2,
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,.08)",
        bgcolor: "rgba(255,255,255,.025)",
      }}
    >
      <Box
        sx={{
          color: accent,
          display: "flex",
          mb: 0.5,
          "& svg": {
            fontSize: 17,
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: 10,
          lineHeight: 1.4,
          color: "rgba(255,255,255,.5)",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
