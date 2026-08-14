"use client";
import { Box, Stack, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// const hourlyData = [
//   { hour: "9 AM", count: 4 },
//   { hour: "10 AM", count: 8 },
//   { hour: "11 AM", count: 13 },
//   { hour: "12 PM", count: 7 },
//   { hour: "1 PM", count: 15 },
//   { hour: "2 PM", count: 11 },
//   { hour: "3 PM", count: 19 },
//   { hour: "4 PM", count: 16 },
//   { hour: "5 PM", count: 22 },
// ];
type hourlyData = {
  hour: number;
  count: number;
};

type mainChartProps = {
  hourlyData: hourlyData[];
};

const MainChartArea = ({ hourlyData }: mainChartProps) => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        background:
          "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
        border: "1px solid rgba(59,130,246,.14)",
        boxShadow: "0 20px 60px rgba(0,0,0,.15)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            Generations per Hour
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 12,
              color: "rgba(255,255,255,.4)",
            }}
          >
            AI generation requests throughout the day.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#60a5fa",
              boxShadow: "0 0 10px rgba(96,165,250,.7)",
            }}
          />

          <Typography
            sx={{
              fontSize: 11,
              color: "rgba(255,255,255,.4)",
            }}
          >
            Generation requests
          </Typography>
        </Stack>
      </Stack>

      {/* CHART */}
      {/* <Box
        sx={{
          mt: 4,
          height: 300,
          display: "flex",
          alignItems: "flex-end",
          gap: {
            xs: 0.8,
            sm: 1.5,
          },
          px: {
            xs: 0,
            sm: 2,
          },
          pb: 3,
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}
      >
        {hourlyData?.map((item) => {
          const height = `${(item.count / 25) * 100}%`;
          return (
            <Box
              key={item.hour}
              sx={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,.45)",
                }}
              >
                {item.count}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  maxWidth: 42,
                  height,
                  minHeight: 5,
                  borderRadius: "6px 6px 2px 2px",

                  background: "linear-gradient(180deg, #60a5fa, #2563eb)",

                  boxShadow: "0 0 20px rgba(37,99,235,.18)",

                  transition: "all .2s ease",

                  "&:hover": {
                    transform: "scaleY(1.03)",
                    boxShadow: "0 0 30px rgba(37,99,235,.35)",
                  },
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  transform: "translateY(28px)",
                  fontSize: 10,
                  color: "rgba(255,255,255,.35)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.hour}
              </Typography>
            </Box>
          );
        })}
      </Box> */}
      <Box sx={{ mt: 3, height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
            <XAxis
              dataKey="hour"
              tickFormatter={(hour) => `${hour}:00`}
              stroke="rgba(255,255,255,.3)"
            />

            <YAxis allowDecimals={false} stroke="rgba(255,255,255,.3)" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MainChartArea;
