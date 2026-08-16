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
import { getNavbarData } from "@/constants/Data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseRounded, LogoutOutlined } from "@mui/icons-material";
import { logoutAction } from "@/feature/auth/actions/logout.action";
import { JwtPayload } from "jsonwebtoken";
import CreditBalance from "@/feature/create/components/CreditBalance";
import LogoutDialog from "@/shared/LogoutDialog";
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
  const [loggingOut, setLoggingOut] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
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
            onClick={handleLogout}
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
      <LogoutDialog open={loggingOut} />
    </>
  );
}

const Navbar = ({ user }: JwtPayload) => {
  const pathname = usePathname();
  const [showNavBar, setShowNavBar] = useState(true);
  const [showDevNote, setShowDevNote] = useState(true);

  const navBarData = getNavbarData(user?.role ?? "user");
  console.log(user, "navbar");
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScollY = window.scrollY;
      if (currentScollY <= 10) {
        setShowNavBar(true);
      } else if (currentScollY > lastScrollY) {
        setShowNavBar(false);
      } else if (currentScollY < lastScrollY) {
        setShowNavBar(true);
      }
      lastScrollY = currentScollY;
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {showDevNote && (
        <Box
          sx={{
            position: "relative",
            top: 0,
            left: 0,
            zIndex: 1100,
            width: "100%",
            py: 0.8,
            px: 2,
            pr: { xs: 5, sm: 6 },
            textAlign: "center",

            background:
              "linear-gradient(90deg, rgba(14,165,233,.14), rgba(37,99,235,.22), rgba(99,102,241,.14))",

            borderBottom: "1px solid rgba(59,130,246,.2)",

            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",

            boxShadow: "0 4px 30px rgba(37,99,235,.08)",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 11,
                md: 12,
              },
              fontWeight: 600,
              letterSpacing: ".01em",
              color: "rgba(255,255,255,.7)",
              lineHeight: 1.5,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#60a5fa",
                fontWeight: 800,
              }}
            >
              ✦ NOTE:
            </Box>{" "}
            Currently under development — this application is deployed for
            production-environment testing.
          </Typography>

          <Button
            onClick={() => setShowDevNote(false)}
            aria-label="Close development notice"
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16 },
              top: "50%",
              transform: "translateY(-50%)",

              minWidth: 28,
              width: 28,
              height: 28,
              p: 0,

              color: "rgba(255,255,255,.55)",
              borderRadius: "50%",

              "&:hover": {
                color: "#fff",
                backgroundColor: "rgba(255,255,255,.08)",
              },
            }}
          >
            <CloseRounded sx={{ fontSize: 18 }} />
          </Button>
        </Box>
      )}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: showDevNote ? 19 : 0,
          left: 0,
          zIndex: 1000,
          width: "100%",

          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          transform: showNavBar ? "translateY(0)" : "translateY(-100%)",

          transition: "transform 0.3s ease, top 0.25s ease",
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
                  background:
                    "linear-gradient(135deg, #0ea5ff 0%, #2563eb 100%)",
                  boxShadow: "0 0 28px rgba(37,99,235,.45)",
                }}
              >
                <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                }}
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
              {navBarData.map((item) => {
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
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UserMenu user={user} />
                <CreditBalance userId={user.userId} />
              </Stack>
            ) : (
              <Button
                component={Link}
                href="/signup"
                variant="outlined"
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },

                  borderColor: "rgba(255,255,255,.18)",
                  color: "#fff",
                  borderRadius: 2,
                  px: 2.2,
                  textTransform: "none",

                  "&:hover": {
                    borderColor: "#3b82f6",
                    bgcolor: "rgba(37,130,235,.08)",
                  },
                }}
              >
                Get Started
              </Button>
            )}

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "none",
                },

                width: 38,
                height: 38,

                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 2,
              }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
