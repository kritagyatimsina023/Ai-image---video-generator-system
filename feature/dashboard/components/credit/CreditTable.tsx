"use client";

import { ICredit } from "@/models/Credits";
import { useModel } from "@/store/useModel";
import {
  AddRounded,
  RemoveRounded,
  CreditCardRounded,
  CalendarTodayRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddCreditDialog from "./AddCreditDialog";
import DeductCreditDialog from "./DeductCreditDialog";

export type CreditUser = {
  id: string;
  name: string;
  email: string;
  credits: number;

  plan: "free" | "starter" | "enterprise";

  planStartedAt: string | null;
  planExpiresAt: string | null;
};

type CreditTableProps = {
  users: CreditUser[];
};

const CreditTable = ({ users }: CreditTableProps) => {
  const { openAddModal, openDeductModal, setSelectedUser } = useModel();
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
      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            minWidth: 900,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellSx}>User</TableCell>

              <TableCell sx={headerCellSx}>Credits</TableCell>

              <TableCell sx={headerCellSx}>Plan</TableCell>

              <TableCell sx={headerCellSx}>Plan Started</TableCell>

              <TableCell sx={headerCellSx}>Plan Expires</TableCell>

              <TableCell sx={headerCellSx} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          {/* BODY */}
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{
                    borderBottom: "none",
                    py: 8,
                    textAlign: "center",
                  }}
                >
                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <CreditCardRounded
                      sx={{
                        fontSize: 35,
                        color: "rgba(255,255,255,.2)",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "rgba(255,255,255,.45)",
                      }}
                    >
                      No users found
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    transition: "background .2s ease",
                    "&:hover": {
                      background: "rgba(37,99,235,.04)",
                    },
                    "&:last-child td": {
                      borderBottom: "none",
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
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 1.5,
                          background: "rgba(37,99,235,.1)",
                          border: "1px solid rgba(59,130,246,.15)",
                        }}
                      >
                        <CreditCardRounded
                          sx={{
                            fontSize: 16,
                            color: "#60a5fa",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#bfdbfe",
                        }}
                      >
                        {user.credits.toLocaleString()}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={bodyCellSx}>
                    <PlanChip plan={user.plan} />
                  </TableCell>

                  <TableCell sx={bodyCellSx}>
                    <DateCell date={user.planStartedAt} />
                  </TableCell>

                  <TableCell sx={bodyCellSx}>
                    <DateCell date={user.planExpiresAt} />
                  </TableCell>

                  <TableCell sx={bodyCellSx} align="right">
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setSelectedUser({
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            credits: user.credits,
                          });

                          openAddModal();
                        }}
                        size="small"
                        sx={actionButtonSx}
                      >
                        <AddRounded fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setSelectedUser({
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            credits: user.credits,
                          });
                          openDeductModal();
                        }}
                        size="small"
                        sx={{
                          ...actionButtonSx,
                          color: "#fca5a5",

                          "&:hover": {
                            color: "#f87171",
                            background: "rgba(239,68,68,.1)",
                          },
                        }}
                      >
                        <RemoveRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCreditDialog />

      <DeductCreditDialog />
    </Box>
  );
};

function PlanChip({ plan }: { plan: CreditUser["plan"] }) {
  const config = {
    free: {
      label: "Free",
      color: "#94a3b8",
      background: "rgba(148,163,184,.08)",
      border: "rgba(148,163,184,.15)",
    },

    starter: {
      label: "Starter Plan",
      color: "#60a5fa",
      background: "rgba(37,99,235,.1)",
      border: "rgba(59,130,246,.2)",
    },

    enterprise: {
      label: "Enterprise",
      color: "#c4b5fd",
      background: "rgba(139,92,246,.1)",
      border: "rgba(139,92,246,.2)",
    },
  };

  const current = config[plan];

  return (
    <Chip
      label={current.label}
      size="small"
      sx={{
        height: 26,
        color: current.color,
        background: current.background,
        border: `1px solid ${current.border}`,
        fontSize: 11,
        fontWeight: 600,
      }}
    />
  );
}

function DateCell({ date }: { date: string | null }) {
  if (!date) {
    return (
      <Typography
        sx={{
          fontSize: 12,
          color: "rgba(255,255,255,.25)",
        }}
      >
        —
      </Typography>
    );
  }

  return (
    <Stack
      direction="row"
      spacing={0.8}
      sx={{
        alignItems: "center",
      }}
    >
      <CalendarTodayRounded
        sx={{
          fontSize: 13,
          color: "rgba(255,255,255,.25)",
        }}
      />

      <Typography
        sx={{
          fontSize: 12,
          color: "rgba(255,255,255,.5)",
        }}
      >
        {new Date(date).toLocaleDateString()}
      </Typography>
    </Stack>
  );
}

const headerCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.08)",
  color: "rgba(255,255,255,.4)",
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: ".05em",
  whiteSpace: "nowrap",
};

const bodyCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.05)",
  py: 2,
};

const actionButtonSx = {
  width: 32,
  height: 32,

  color: "#86efac",

  border: "1px solid rgba(34,197,94,.15)",
  background: "rgba(34,197,94,.06)",

  "&:hover": {
    color: "#4ade80",
    background: "rgba(34,197,94,.12)",
  },
};

export default CreditTable;
