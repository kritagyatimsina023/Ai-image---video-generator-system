import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  "User",
  "Email",
  "Credits",
  "Images",
  "Videos",
  "Status",
  "Joined",
  "Actions",
];

const UserTableSkeleton = () => {
  return (
    <TableContainer
      component={Box}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: "rgba(7,16,31,.7)",
        border: "1px solid rgba(255,255,255,.07)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "rgba(15,23,42,.7)",
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.07)",
                  color: "rgba(255,255,255,.4)",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              {/* User */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={36}
                    height={36}
                    sx={{
                      bgcolor: "rgba(255,255,255,.08)",
                    }}
                  />

                  <Skeleton
                    variant="text"
                    width={100}
                    height={22}
                    sx={{
                      bgcolor: "rgba(255,255,255,.08)",
                    }}
                  />
                </Box>
              </TableCell>

              {/* Email */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="text"
                  width={160}
                  height={22}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Credits */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={65}
                  height={28}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Images */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="text"
                  width={40}
                  height={22}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Videos */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="text"
                  width={40}
                  height={22}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Status */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={26}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Joined */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Skeleton
                  variant="text"
                  width={85}
                  height={22}
                  sx={{
                    bgcolor: "rgba(255,255,255,.08)",
                  }}
                />
              </TableCell>

              {/* Actions */}
              <TableCell
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width={32}
                    height={32}
                    sx={{
                      bgcolor: "rgba(255,255,255,.08)",
                    }}
                  />

                  <Skeleton
                    variant="rounded"
                    width={32}
                    height={32}
                    sx={{
                      bgcolor: "rgba(255,255,255,.08)",
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTableSkeleton;
