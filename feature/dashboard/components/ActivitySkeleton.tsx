import { Box, Chip, Skeleton, Stack } from "@mui/material";
import React from "react";

const ActivitySkeleton = () => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        background: "rgba(7,16,31,.7)",
        border: "1px solid rgba(255,255,255,.07)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          {/* Recent Activity */}
          <Skeleton
            animation="wave"
            variant="text"
            width={140}
            height={26}
            sx={{
              bgcolor: "rgba(255,255,255,.08)",
            }}
          />

          {/* Description */}
          <Skeleton
            animation="wave"
            variant="text"
            width={250}
            height={20}
            sx={{
              mt: 0.5,
              bgcolor: "rgba(255,255,255,.05)",
            }}
          />
        </Box>

        {/* Delete button */}
        <Skeleton
          animation="wave"
          variant="rounded"
          width={80}
          height={32}
          sx={{
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,.06)",
          }}
        />
      </Box>

      {/* ACTIVITY ITEMS */}
      <Stack spacing={1} sx={{ mt: 3 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <ActivityItemSkeleton key={index} />
        ))}
      </Stack>
    </Box>
  );
};

const ActivityItemSkeleton = () => {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        alignItems: "center",
        p: 1.5,
        borderRadius: 2,
        background: "rgba(255,255,255,.015)",
        border: "1px solid rgba(255,255,255,.04)",
      }}
    >
      {/* ICON */}
      <Skeleton
        animation="wave"
        variant="rounded"
        width={38}
        height={38}
        sx={{
          flexShrink: 0,
          borderRadius: 2,
          bgcolor: "rgba(37,99,235,.08)",
        }}
      />

      {/* CONTENT */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          {/* User name */}
          <Skeleton
            animation="wave"
            variant="text"
            width={90}
            height={20}
            sx={{
              bgcolor: "rgba(255,255,255,.08)",
            }}
          />

          {/* Chip */}
          <Skeleton
            animation="wave"
            variant="rounded"
            width={55}
            height={20}
            sx={{
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,.06)",
            }}
          />
        </Stack>

        {/* Description */}
        <Skeleton
          animation="wave"
          variant="text"
          width="70%"
          height={18}
          sx={{
            mt: 0.4,
            bgcolor: "rgba(255,255,255,.05)",
          }}
        />
      </Box>

      {/* TIME */}
      <Skeleton
        animation="wave"
        variant="text"
        width={45}
        height={18}
        sx={{
          flexShrink: 0,
          bgcolor: "rgba(255,255,255,.05)",
        }}
      />
    </Stack>
  );
};

export default ActivitySkeleton;
