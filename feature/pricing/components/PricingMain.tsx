"use client";

import { BillingPeriod } from "@/feature/pricing/pricing.type";
import { plans } from "@/constants/Data";
import {
  CloudRounded,
  AutoAwesomeRounded,
  BoltRounded,
  HeadsetMicRounded,
  LockRounded,
  ReplayRounded,
  PercentRounded,
} from "@mui/icons-material";

import { Box, Container, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { PricingCard } from "@/feature/pricing/components/PricingCard";
import { UserTypes } from "@/types/global.types";
import { JwtPayload } from "@/lib/auth";

const benefits = [
  {
    icon: <LockRounded />,
    title: "Secure & Private",
    description: "Your generations and account data stay protected.",
  },
  {
    icon: <CloudRounded />,
    title: "Cloud Based",
    description: "Access your creations from anywhere.",
  },
  {
    icon: <BoltRounded />,
    title: "Always Updated",
    description: "Get the latest AI features automatically.",
  },
  {
    icon: <HeadsetMicRounded />,
    title: "24/7 Support",
    description: "We're here whenever you need us.",
  },
  {
    icon: <ReplayRounded />,
    title: "Cancel Anytime",
    description: "No long-term contracts or commitments.",
  },
  {
    icon: <PercentRounded />,
    title: "Flexible Billing",
    description: "Switch plans or billing periods anytime.",
  },
];

const PricingMain = ({ user }: { user: JwtPayload | null }) => {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const isYearly = billing === "yearly";
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#000",
        color: "#fff",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
        position: "relative",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 700,
          height: 700,
          top: -300,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(37,99,235,.16), transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Stack
          spacing={2}
          sx={{
            textAlign: "center",
            alignItems: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.8,
              borderRadius: 10,
              border: "1px solid rgba(59,130,246,.35)",
              bgcolor: "rgba(37,99,235,.08)",
              boxShadow: "0 0 30px rgba(37,99,235,.08)",
            }}
          >
            <AutoAwesomeRounded
              sx={{
                fontSize: 17,
                color: "#60a5fa",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#bfdbfe",
              }}
            >
              Simple Pricing, Powerful Creation
            </Typography>
          </Box>
          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.4rem",
                sm: "3.3rem",
                md: "4.2rem",
              },
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-.045em",
              maxWidth: 850,
            }}
          >
            Choose the plan{" "}
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(90deg, #1688ff 0%, #6366f1 50%, #c026d3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              that is right for you
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,.52)",
              maxWidth: 650,
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
            }}
          >
            Start creating with powerful AI models. Upgrade when you need more
            credits, faster generation, and premium features.
          </Typography>

          {/* Billing */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 2,
              p: 0.7,
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,.1)",
              bgcolor: "rgba(4,9,18,.8)",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 0.9,
                borderRadius: 2,
                bgcolor: !isYearly
                  ? "linear-gradient(135deg, #1688ff, #2563eb)"
                  : "transparent",
                background: !isYearly
                  ? "linear-gradient(135deg, #1688ff, #2563eb)"
                  : "transparent",
                boxShadow: !isYearly ? "0 5px 20px rgba(37,99,235,.3)" : "none",
                cursor: "pointer",
              }}
              onClick={() => setBilling("monthly")}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Monthly
              </Typography>
            </Box>

            <Box
              sx={{
                px: 2,
                py: 0.9,
                borderRadius: 2,
                bgcolor: isYearly
                  ? "linear-gradient(135deg, #1688ff, #2563eb)"
                  : "transparent",
                background: isYearly
                  ? "linear-gradient(135deg, #1688ff, #2563eb)"
                  : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setBilling("yearly")}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Yearly
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#c084fc",
                fontSize: 12,
                fontWeight: 700,
                px: 1,
                whiteSpace: "nowrap",
              }}
            >
              Save up to 25%
            </Typography>
          </Stack>
        </Stack>

        {/* Pricing cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 3, lg: 3.5 },
            alignItems: "stretch",
            maxWidth: 1250,
            mx: "auto",
          }}
        >
          {plans.map((plan) => (
            <PricingCard
              user={user}
              key={plan.name}
              plan={plan}
              yearly={isYearly}
            />
          ))}
        </Box>
        {/* Bottom benefits */}
        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            border: "1px solid rgba(59,130,246,.15)",
            borderRadius: 4,
            bgcolor: "rgba(4,9,18,.72)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(6, 1fr)",
              },
            }}
          >
            {benefits.map((benefit, index) => (
              <Box
                key={benefit.title}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  textAlign: "center",

                  borderRight: {
                    md:
                      index !== benefits.length - 1
                        ? "1px solid rgba(255,255,255,.08)"
                        : "none",
                  },

                  borderBottom: {
                    xs: index < 4 ? "1px solid rgba(255,255,255,.08)" : "none",
                    sm: index < 3 ? "1px solid rgba(255,255,255,.08)" : "none",
                    md: "none",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    mx: "auto",
                    mb: 1.2,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    color: "#60a5fa",
                    bgcolor: "rgba(37,99,235,.1)",
                    border: "1px solid rgba(59,130,246,.15)",
                  }}
                >
                  {benefit.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {benefit.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10.5,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,.4)",
                  }}
                >
                  {benefit.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingMain;
