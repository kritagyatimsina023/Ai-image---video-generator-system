// export const revalidate = 30;
import {
  AutoAwesomeRounded,
  PeopleRounded,
  CreditCardRounded,
  ImageRounded,
  VideocamRounded,
} from "@mui/icons-material";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { getDashboardStats } from "../actions/getDashboardStats";

export default async function DashboardPage() {
  const statsData = await getDashboardStats();

  const stats = [
    {
      title: "Total Users",
      value: statsData.totalUsers.toLocaleString(),
      description: "Registered users",
      icon: PeopleRounded,
    },
    {
      title: "Total Credits",
      value: statsData.totalCredits.toLocaleString(),
      description: "Credits remaining",
      icon: CreditCardRounded,
    },
    {
      title: "Images Generated",
      value: statsData.imagesGenerated.toLocaleString(),
      description: "Total image generations",
      icon: ImageRounded,
    },
    {
      title: "Videos Generated",
      value: statsData.videosGenerated.toLocaleString(),
      description: "Total video generations",
      icon: VideocamRounded,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              letterSpacing: "-.03em",
            }}
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "rgba(255,255,255,.45)",
            }}
          >
            Monitor your AI Studio platform.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: {
              xs: 2,
              sm: 0,
            },
            alignItems: "center",
          }}
        >
          <AutoAwesomeRounded
            sx={{
              fontSize: 18,
              color: "#60a5fa",
            }}
          />

          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(255,255,255,.5)",
            }}
          >
            Admin Panel
          </Typography>
        </Stack>
      </Stack>

      {/* Statistics */}
      <Grid container spacing={2}>
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Grid
              key={stat.title}
              size={{
                xs: 12,
                sm: 6,
                lg: 3,
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  minHeight: 150,
                  borderRadius: 3,
                  background:
                    "linear-gradient(145deg, rgba(15,23,42,.9), rgba(7,16,31,.75))",
                  border: "1px solid rgba(59,130,246,.14)",
                  boxShadow: "0 20px 60px rgba(0,0,0,.2)",
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
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(255,255,255,.45)",
                      }}
                    >
                      {stat.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 28,
                        fontWeight: 800,
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 2,
                      background: "rgba(37,99,235,.1)",
                      border: "1px solid rgba(59,130,246,.18)",
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 20,
                        color: "#60a5fa",
                      }}
                    />
                  </Box>
                </Stack>

                <Typography
                  sx={{
                    mt: 2,
                    fontSize: 12,
                    color: "rgba(255,255,255,.3)",
                  }}
                >
                  {stat.description}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Recent activity */}
      <Box
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 3,
          background: "rgba(7,16,31,.7)",
          border: "1px solid rgba(255,255,255,.07)",
        }}
      >
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          Recent Activity
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 13,
            color: "rgba(255,255,255,.4)",
          }}
        >
          Recent users and AI generations will appear here.
        </Typography>
      </Box>
    </Box>
  );
}
