import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columns = [
  "User",
  "Credits",
  "Generation",
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
        border: "1px solid rgba(59,130,246,.14)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  color: "rgba(255,255,255,.4)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
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
              {/* USER */}
              <TableCell sx={bodyCellSx}>
                <Stack spacing={0.5}>
                  <Skeleton
                    variant="text"
                    width={110}
                    height={22}
                    sx={skeletonSx}
                  />

                  <Skeleton
                    variant="text"
                    width={160}
                    height={18}
                    sx={skeletonSx}
                  />
                </Stack>
              </TableCell>

              {/* CREDITS */}
              <TableCell sx={bodyCellSx}>
                <Skeleton
                  variant="text"
                  width={60}
                  height={24}
                  sx={skeletonSx}
                />
              </TableCell>

              {/* GENERATION */}
              <TableCell sx={bodyCellSx}>
                <Stack direction="row" spacing={1}>
                  <Skeleton
                    variant="rounded"
                    width={55}
                    height={26}
                    sx={skeletonSx}
                  />

                  <Skeleton
                    variant="rounded"
                    width={55}
                    height={26}
                    sx={skeletonSx}
                  />
                </Stack>
              </TableCell>

              {/* STATUS */}
              <TableCell sx={bodyCellSx}>
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={26}
                  sx={skeletonSx}
                />
              </TableCell>

              {/* JOINED */}
              <TableCell sx={bodyCellSx}>
                <Skeleton
                  variant="text"
                  width={85}
                  height={22}
                  sx={skeletonSx}
                />
              </TableCell>

              {/* ACTIONS */}
              <TableCell sx={bodyCellSx} align="right">
                <Skeleton
                  variant="rounded"
                  width={32}
                  height={32}
                  sx={skeletonSx}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const bodyCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.05)",
};

const skeletonSx = {
  bgcolor: "rgba(255,255,255,.08)",
};

export default UserTableSkeleton;
