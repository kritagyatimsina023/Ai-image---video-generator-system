import { Box } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import { Suspense } from "react";
import DashboardStats from "./DashboardStats";
import DashboardActivity from "./DashboardActivity";
import DashboardStatsSkeleton from "./DashboardStatsSkeleton";
import ActivitySkeleton from "./ActivitySkeleton";

export default async function DashboardPage() {
  return (
    <Box>
      <DashboardHeader />
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <DashboardActivity />
      </Suspense>
    </Box>
  );
}
