import { Box, Stack, Typography } from "@mui/material";

export const GenerationType = ({
  icon,
  label,
  value,
  total,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
}) => {
  const percentage = (value / total) * 100;
  console.log(percentage);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              borderRadius: 1.5,
              background: "rgba(37,99,235,.1)",
              color: "#60a5fa",
            }}
          >
            {icon}
          </Box>

          <Typography sx={{ fontSize: 13 }}>{label}</Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: 1,
          height: 6,
          borderRadius: 10,
          background: "rgba(255,255,255,.06)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 10,
            background: "linear-gradient(90deg, #2563eb, #60a5fa)",
          }}
        />
      </Box>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 10,
          color: "rgba(255,255,255,.3)",
        }}
      >
        {percentage.toFixed(1)}% of total generations
      </Typography>
    </Box>
  );
};
