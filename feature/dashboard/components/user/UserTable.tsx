"use client";

import {
  BlockRounded,
  CheckCircleRounded,
  DeleteOutlineRounded,
  ImageRounded,
  MoreVertRounded,
  VideocamRounded,
} from "@mui/icons-material";

import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useTransition } from "react";
import { banUser, toggleBanUser } from "../../actions/users/userActions";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  credits: number;
  imagesGenerated: number;
  videosGenerated: number;
  createdAt: string;
};

type UserTableProps = {
  users: User[];
};

const UserTable = ({ users }: UserTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };
  const handleBanUser = () => {
    if (!selectedUser) return;
    const userId = selectedUser.id;
    startTransition(async () => {
      try {
        await toggleBanUser(userId);
        router.refresh();
      } catch (error) {
        console.error("Failed to ban user:", error);
      }
      handleMenuClose();
    });
  };

  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(59,130,246,.14)",
        background: "rgba(7,16,31,.7)",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellSx}>User</TableCell>

              <TableCell sx={headerCellSx}>Credits</TableCell>

              <TableCell sx={headerCellSx}>Generations</TableCell>

              <TableCell sx={headerCellSx}>Status</TableCell>

              <TableCell sx={headerCellSx}>Joined</TableCell>

              <TableCell sx={headerCellSx} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    background: "rgba(37,99,235,.04)",
                  },
                }}
              >
                {/* USER */}
                <TableCell sx={bodyCellSx}>
                  <Stack spacing={0.3}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {user.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "rgba(255,255,255,.4)",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* CREDITS */}
                <TableCell sx={bodyCellSx}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#bfdbfe",
                    }}
                  >
                    {user.credits.toLocaleString()}
                  </Typography>
                </TableCell>

                {/* GENERATIONS */}
                <TableCell sx={bodyCellSx}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      icon={<ImageRounded sx={{ fontSize: 15 }} />}
                      label={user.imagesGenerated}
                      size="small"
                      sx={chipSx}
                    />

                    <Chip
                      icon={<VideocamRounded sx={{ fontSize: 15 }} />}
                      label={user.videosGenerated}
                      size="small"
                      sx={chipSx}
                    />
                  </Stack>
                </TableCell>

                {/* STATUS */}
                <TableCell sx={bodyCellSx}>
                  {user.banned ? (
                    <Chip
                      label="Banned"
                      size="small"
                      sx={{
                        color: "#fca5a5",
                        background: "rgba(239,68,68,.1)",
                        border: "1px solid rgba(239,68,68,.2)",
                      }}
                    />
                  ) : (
                    <Chip
                      label={user.banned ? "Banned" : "Active"}
                      size="small"
                      sx={{
                        color: "#86efac",
                        background: "rgba(34,197,94,.1)",
                        border: "1px solid rgba(34,197,94,.2)",
                      }}
                    />
                  )}
                </TableCell>

                {/* CREATED */}
                <TableCell sx={bodyCellSx}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "rgba(255,255,255,.45)",
                    }}
                  >
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>

                {/* ACTIONS */}
                <TableCell sx={bodyCellSx} align="right">
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, user)}
                    sx={{
                      color: "rgba(255,255,255,.5)",

                      "&:hover": {
                        color: "#fff",
                        background: "rgba(255,255,255,.08)",
                      },
                    }}
                  >
                    <MoreVertRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ACTION MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#07101f",
              color: "#fff",
              border: "1px solid rgba(59,130,246,.2)",
              borderRadius: 2,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleBanUser}
          disabled={isPending}
          sx={{
            gap: 1,
            fontSize: 13,

            "&:hover": {
              bgcolor: "rgba(239,68,68,.08)",
            },
          }}
        >
          {selectedUser?.banned ? (
            <CheckCircleRounded fontSize="small" />
          ) : (
            <BlockRounded fontSize="small" />
          )}

          {isPending
            ? "Updating..."
            : selectedUser?.banned
              ? "Unban User"
              : "Ban User"}
        </MenuItem>

        <MenuItem
          onClick={() => {
            console.log("Delete:", selectedUser?.id);

            handleMenuClose();
          }}
          sx={{
            gap: 1,
            fontSize: 13,
            color: "#f87171",

            "&:hover": {
              bgcolor: "rgba(239,68,68,.08)",
            },
          }}
        >
          <DeleteOutlineRounded fontSize="small" />
          Delete User
        </MenuItem>
      </Menu>
    </Box>
  );
};

const headerCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.08)",
  color: "rgba(255,255,255,.4)",
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: ".05em",
};

const bodyCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.05)",
};

const chipSx = {
  height: 26,
  color: "#bfdbfe",
  background: "rgba(37,99,235,.08)",
  border: "1px solid rgba(59,130,246,.15)",
  fontSize: 11,
};

export default UserTable;
