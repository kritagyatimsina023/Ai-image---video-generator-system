import { Box, Stack, Typography } from "@mui/material";

export const AnalyticsCard = ({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) => {
  const isNegative = change.trim().startsWith("-");
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        background:
          "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
        border: "1px solid rgba(59,130,246,.14)",
        transition: "all .2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "rgba(59,130,246,.3)",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            background: "rgba(37,99,235,.1)",
            border: "1px solid rgba(59,130,246,.15)",
            color: "#60a5fa",
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            color: isNegative ? "#fca5a5" : "#86efac",
          }}
        >
          {change}
        </Typography>
      </Stack>

      <Typography
        sx={{
          mt: 2,
          fontSize: 12,
          color: "rgba(255,255,255,.4)",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 24,
          fontWeight: 800,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
