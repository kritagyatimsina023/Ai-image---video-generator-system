import DashboardPage from "@/feature/dashboard/components/DashboardPage";
import DashboardSkeleton from "@/feature/dashboard/components/DashboardSkeleton";
import { Suspense } from "react";

const DashboardHome = async () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
};

export default DashboardHome;
