import { updateTag } from "next/cache";

export const CACHE_TAGS = {
  users: "admin-users",
  credits: "admin-credit-users",
  dashboard: "dashboard-stats",
  activities: "recent-activities",
} as const;

export const invalidate = {
  users() {
    updateTag(CACHE_TAGS.users);
  },

  credits() {
    updateTag(CACHE_TAGS.credits);
  },

  dashboard() {
    updateTag(CACHE_TAGS.dashboard);
  },

  activities() {
    updateTag(CACHE_TAGS.activities);
  },
  creditChange() {
    updateTag(CACHE_TAGS.credits);
    updateTag(CACHE_TAGS.users);
    updateTag(CACHE_TAGS.dashboard);
    updateTag(CACHE_TAGS.activities);
  },
  signup() {
    updateTag(CACHE_TAGS.users);
    updateTag(CACHE_TAGS.credits);
    updateTag(CACHE_TAGS.dashboard);
    updateTag(CACHE_TAGS.activities);
  },
  userStatusChange() {
    updateTag(CACHE_TAGS.users);
    updateTag(CACHE_TAGS.activities);
  },
  toggleBanUser() {
    updateTag(CACHE_TAGS.dashboard);
    updateTag(CACHE_TAGS.users);
    updateTag(CACHE_TAGS.activities);
  },

  userManagement() {
    updateTag(CACHE_TAGS.users);
    updateTag(CACHE_TAGS.credits);
    updateTag(CACHE_TAGS.dashboard);
    updateTag(CACHE_TAGS.activities);
  },
};
