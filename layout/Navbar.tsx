"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Link from "next/link";
import { navbarData } from "@/constants/Data";
import { usePathname } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { useState } from "react";
import { LogoutOutlined } from "@mui/icons-material";
import { logoutAction } from "@/feature/auth/actions/logout.action";
import { JwtPayload } from "jsonwebtoken";
type User = {
  id: string;
  name: string;
  email: string;
};

type NavbarProps = {
  user: User | null;
};
function UserMenu({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        onMouseEnter={handleOpen}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 38,
            height: 38,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg, #1688ff, #2563eb)",
            border: "2px solid rgba(96,165,250,.25)",
            boxShadow: "0 0 20px rgba(37,99,235,.2)",

            "&:hover": {
              boxShadow: "0 0 30px rgba(37,99,235,.4)",
            },
          }}
        >
          {/* {user.email} */}
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onMouseLeave={handleClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 220,
                bgcolor: "#07101f",
                color: "#fff",
                border: "1px solid rgba(59,130,246,.2)",
                borderRadius: 2.5,
                boxShadow: "0 20px 60px rgba(0,0,0,.5)",
              },
            },
          }}
        >
          {/* User information */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {user.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 12,
                color: "rgba(255,255,255,.4)",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.email}
            </Typography>
          </Box>

          {/* Logout */}
          <MenuItem
            onClick={async () => {
              await logoutAction();
            }}
            sx={{
              gap: 1,
              mt: 0.5,
              fontSize: 14,

              "&:hover": {
                bgcolor: "rgba(239,68,68,.08)",
                color: "#f87171",
              },
            }}
          >
            <LogoutOutlined
              sx={{
                fontSize: 18,
              }}
            />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

const Navbar = ({ user }: JwtPayload) => {
  const pathname = usePathname();
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          sx={{
            height: { xs: 68, md: 76 },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={1.1}
            sx={{
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                background: "linear-gradient(135deg, #0ea5ff 0%, #2563eb 100%)",
                boxShadow: "0 0 28px rgba(37,99,235,.45)",
              }}
            >
              <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
              }}
              // letterSpacing="-0.03em"
            >
              AI Studio
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={3.5}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {navbarData.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: isActive ? "#60a5fa" : "rgba(255,255,255,.65)",
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: "none",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              );
            })}
          </Stack>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button
              component={Link}
              href="/signup"
              variant="outlined"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                borderColor: "rgba(255,255,255,.18)",
                color: "#fff",
                borderRadius: 2,
                px: 2.2,
                textTransform: "none",

                "&:hover": {
                  borderColor: "#3b82f6",
                  bgcolor: "rgba(37,99,235,.08)",
                },
              }}
            >
              Get Started
            </Button>
          )}

          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              width: 38,
              height: 38,
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 2,
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
