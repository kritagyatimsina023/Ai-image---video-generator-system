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
  "Plan",
  "Plan Started",
  "Plan Expires",
  "Actions",
];

const CreditTableSkeleton = () => {
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
        <Table sx={{ minWidth: 900 }}>
          {/* HEADER */}
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

          {/* BODY */}
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
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Skeleton
                      variant="rounded"
                      width={30}
                      height={30}
                      sx={skeletonSx}
                    />

                    <Skeleton
                      variant="text"
                      width={65}
                      height={22}
                      sx={skeletonSx}
                    />
                  </Stack>
                </TableCell>

                {/* PLAN */}
                <TableCell sx={bodyCellSx}>
                  <Skeleton
                    variant="rounded"
                    width={85}
                    height={26}
                    sx={skeletonSx}
                  />
                </TableCell>

                {/* PLAN STARTED */}
                <TableCell sx={bodyCellSx}>
                  <Skeleton
                    variant="text"
                    width={95}
                    height={22}
                    sx={skeletonSx}
                  />
                </TableCell>

                {/* PLAN EXPIRES */}
                <TableCell sx={bodyCellSx}>
                  <Skeleton
                    variant="text"
                    width={95}
                    height={22}
                    sx={skeletonSx}
                  />
                </TableCell>

                {/* ACTIONS */}
                <TableCell sx={bodyCellSx} align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      justifyContent: "flex-end",
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      width={32}
                      height={32}
                      sx={skeletonSx}
                    />

                    <Skeleton
                      variant="rounded"
                      width={32}
                      height={32}
                      sx={skeletonSx}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const skeletonSx = {
  bgcolor: "rgba(255,255,255,.08)",
};

const bodyCellSx = {
  borderBottom: "1px solid rgba(255,255,255,.05)",
  py: 2,
};

export default CreditTableSkeleton;
