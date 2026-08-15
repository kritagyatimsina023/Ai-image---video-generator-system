import React from "react";
import { getCreditUsers } from "../../actions/credits/credits.action";
import CreditTable from "./CreditTable";
import { delay } from "@/shared/Delay";

const CreditMainPage = async () => {
  //   await delay(4000);
  const users = await getCreditUsers();

  return <CreditTable users={users} />;
};

export default CreditMainPage;
