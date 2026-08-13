import { getCreditUsers } from "@/feature/dashboard/actions/credits/credits.action";
import CreditPageHeader from "@/feature/dashboard/components/credit/CreditPageHeader";
import CreditTable from "@/feature/dashboard/components/credit/CreditTable";
import UserTableSkeleton from "@/feature/dashboard/components/user/userTableSkeleton";
import React, { Suspense } from "react";

const CreditMain = async () => {
  const users = await getCreditUsers();
  return (
    <>
      <CreditPageHeader />
      <Suspense fallback={<UserTableSkeleton />}>
        <CreditTable users={users} />
      </Suspense>
    </>
  );
};

export default CreditMain;
