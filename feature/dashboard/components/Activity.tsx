import {
  AddCardRounded,
  BlockRounded,
  ImageRounded,
  PersonAddRounded,
  RemoveShoppingCartSharp,
  VideocamRounded,
  WorkspacePremiumRounded,
} from "@mui/icons-material";

import { Box, Chip, Stack, Typography } from "@mui/material";

import ActivityDeleteButton from "./ActivityDeleteButton";

export type ActivityType =
  | "USER_REGISTERED"
  | "IMAGE_GENERATED"
  | "VIDEO_GENERATED"
  | "CREDIT_ADDED"
  | "CREDIT_DEDUCTED"
  | "USER_BANNED"
  | "PLAN_CHANGED";

export type ActivityData = {
  id: string;
  type: ActivityType;
  description: string;
  user: {
    name: string;
    email: string;
  } | null;
  createdAt: string;
};

type ActivityProps = {
  activities: ActivityData[];
};

const Activity = ({ activities }: ActivityProps) => {
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
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            Recent Activity
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 13,
              color: "rgba(255,255,255,.4)",
            }}
          >
            Latest activity across your platform.
          </Typography>
        </Box>
        <ActivityDeleteButton />
      </Box>

      {/* ACTIVITIES */}
      <Stack spacing={1} sx={{ mt: 3 }}>
        {activities.length === 0 ? (
          <Box
            sx={{
              py: 5,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(255,255,255,.35)",
              }}
            >
              No recent activity.
            </Typography>
          </Box>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </Stack>
    </Box>
  );
};

const ActivityItem = ({ activity }: { activity: ActivityData }) => {
  const config = getActivityConfig(activity.type);

  const Icon = config.icon;

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

        transition: "all .2s ease",

        "&:hover": {
          background: "rgba(37,99,235,.04)",
          borderColor: "rgba(59,130,246,.1)",
        },
      }}
    >
      {/* ICON */}
      <Box
        sx={{
          width: 38,
          height: 38,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          borderRadius: 2,

          background: config.background,
          border: `1px solid ${config.border}`,
        }}
      >
        <Icon
          sx={{
            fontSize: 19,
            color: config.color,
          }}
        />
      </Box>

      {/* CONTENT */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {activity.user?.name ?? "System"}
          </Typography>

          <Chip
            label={config.label}
            size="small"
            sx={{
              height: 20,
              color: config.color,
              background: config.background,
              border: `1px solid ${config.border}`,
              fontSize: 9,
              fontWeight: 600,
            }}
          />
        </Stack>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 12,
            color: "rgba(255,255,255,.45)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {activity.description}
        </Typography>
      </Box>

      {/* TIME */}
      <Typography
        sx={{
          flexShrink: 0,
          fontSize: 11,
          color: "rgba(255,255,255,.3)",
        }}
      >
        {formatRelativeTime(activity.createdAt)}
      </Typography>
    </Stack>
  );
};

function getActivityConfig(type: ActivityType) {
  const config = {
    USER_REGISTERED: {
      label: "Registered",
      icon: PersonAddRounded,
      color: "#86efac",
      background: "rgba(34,197,94,.08)",
      border: "rgba(34,197,94,.15)",
    },

    IMAGE_GENERATED: {
      label: "Image",
      icon: ImageRounded,
      color: "#60a5fa",
      background: "rgba(37,99,235,.08)",
      border: "rgba(59,130,246,.15)",
    },

    VIDEO_GENERATED: {
      label: "Video",
      icon: VideocamRounded,
      color: "#c4b5fd",
      background: "rgba(139,92,246,.08)",
      border: "rgba(139,92,246,.15)",
    },
    USER_UNBANNED: {
      label: "Unbanned",
      icon: BlockRounded,
      color: "#86efac",
      background: "rgba(34,197,94,.08)",
      border: "rgba(34,197,94,.15)",
    },

    CREDIT_ADDED: {
      label: "Credits Added",
      icon: AddCardRounded,
      color: "#86efac",
      background: "rgba(34,197,94,.08)",
      border: "rgba(34,197,94,.15)",
    },

    CREDIT_DEDUCTED: {
      label: "Credits Deducted",
      icon: RemoveShoppingCartSharp,
      color: "#fca5a5",
      background: "rgba(239,68,68,.08)",
      border: "rgba(239,68,68,.15)",
    },

    USER_BANNED: {
      label: "Banned",
      icon: BlockRounded,
      color: "#fca5a5",
      background: "rgba(239,68,68,.08)",
      border: "rgba(239,68,68,.15)",
    },

    PLAN_CHANGED: {
      label: "Plan Changed",
      icon: WorkspacePremiumRounded,
      color: "#fcd34d",
      background: "rgba(234,179,8,.08)",
      border: "rgba(234,179,8,.15)",
    },
  };

  return config[type];
}

function formatRelativeTime(date: string) {
  const now = Date.now();
  const created = new Date(date).getTime();

  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(date).toLocaleDateString();
}

export default Activity;
