import { getCurrentUser } from "@/lib/getCurrentUser";
import React from "react";
import Navbar from "./Navbar";
// import { delay } from "@/shared/Delay";

const UserNavbar = async () => {
  //   await delay(4000);
  const currentUser = await getCurrentUser();
  return <Navbar user={currentUser} />;
};

export default UserNavbar;
