import Navbar from "@/layout/Navbar";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Navbar user={currentUser} />
      {children}
    </>
  );
}
