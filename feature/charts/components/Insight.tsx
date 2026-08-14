import { Stack, Typography } from "@mui/material";
interface insightProps {
  label: string;
  value: string | null;
}

export const Insight = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        borderRadius: 2,
        background: "rgba(255,255,255,.02)",
        border: "1px solid rgba(255,255,255,.05)",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: "rgba(255,255,255,.45)",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#bfdbfe",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};
