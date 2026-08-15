import Navbar from "@/layout/Navbar";
import NavbarSkeleton from "@/layout/NavbarSkeleton";
import UserNavbar from "@/layout/UserNavbar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Suspense } from "react";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<NavbarSkeleton />}>
        <UserNavbar />
      </Suspense>
      {children}
    </>
  );
}
