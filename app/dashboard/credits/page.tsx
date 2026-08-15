import { getCreditUsers } from "@/feature/dashboard/actions/credits/credits.action";
import CreditMainPage from "@/feature/dashboard/components/credit/CreditMainPage";
import CreditPageHeader from "@/feature/dashboard/components/credit/CreditPageHeader";
import CreditTable from "@/feature/dashboard/components/credit/CreditTable";
import CreditTableSkeleton from "@/feature/dashboard/components/credit/CreditTableSkeleton";
import UserTableSkeleton from "@/feature/dashboard/components/user/userTableSkeleton";
import React, { Suspense } from "react";

const CreditMain = async () => {
  return (
    <>
      <CreditPageHeader />
      <Suspense fallback={<CreditTableSkeleton />}>
        <CreditMainPage />
      </Suspense>
    </>
  );
};

export default CreditMain;
