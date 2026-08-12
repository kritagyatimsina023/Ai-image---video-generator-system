"use client";

import { logoutAction } from "@/feature/auth/actions/logout.action";
import {
  AutoAwesomeRounded,
  DashboardRounded,
  PeopleRounded,
  CreditCardRounded,
  MovieCreationRounded,
  LogoutRounded,
} from "@mui/icons-material";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: DashboardRounded,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: PeopleRounded,
  },
  {
    label: "Credits",
    href: "/dashboard/credits",
    icon: CreditCardRounded,
  },
  {
    label: "Generations",
    href: "/dashboard/generations",
    icon: MovieCreationRounded,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 250,
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,.08)",
        background: "rgba(3,7,18,.85)",
        backdropFilter: "blur(20px)",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Stack
        direction="row"
        spacing={1.2}
        sx={{
          alignItems: "center",
          px: 3,
          py: 3,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            display: "grid",
            placeItems: "center",
            borderRadius: 2,
            background: "linear-gradient(135deg, #0ea5ff 0%, #2563eb 100%)",
            boxShadow: "0 0 28px rgba(37,99,235,.4)",
          }}
        >
          <AutoAwesomeRounded sx={{ fontSize: 20 }} />
        </Box>

        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 17,
          }}
        >
          AI Studio
        </Typography>
      </Stack>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.08)",
        }}
      />

      {/* Admin label */}
      <Typography
        sx={{
          px: 3,
          pt: 3,
          pb: 1,
          fontSize: 11,
          fontWeight: 700,
          color: "rgba(255,255,255,.35)",
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        Administration
      </Typography>

      {/* Navigation */}
      <Stack spacing={0.5} sx={{ px: 1.5 }}>
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.2,
                borderRadius: 2,
                textDecoration: "none",

                color: isActive ? "#60a5fa" : "rgba(255,255,255,.6)",

                background: isActive ? "rgba(37,99,235,.12)" : "transparent",

                border: isActive
                  ? "1px solid rgba(59,130,246,.18)"
                  : "1px solid transparent",

                transition: "all .2s ease",

                "&:hover": {
                  color: "#fff",
                  background: "rgba(37,99,235,.08)",
                },
              }}
            >
              <Icon sx={{ fontSize: 20 }} />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Bottom */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 1.2,
            borderRadius: 2,
            color: "rgba(255,255,255,.5)",
            cursor: "pointer",

            "&:hover": {
              color: "#f87171",
              background: "rgba(239,68,68,.08)",
            },
          }}
        >
          <LogoutRounded sx={{ fontSize: 20 }} />
          <Button
            onClick={async () => {
              await logoutAction();
            }}
            sx={{ fontSize: 14 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
