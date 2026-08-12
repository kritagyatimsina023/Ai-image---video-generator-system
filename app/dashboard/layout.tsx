import AdminSidebar from "@/feature/dashboard/components/AdminSidebar";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "radial-gradient(circle at 50% 0%, rgba(37,99,235,.08), transparent 40%), #030712",
        color: "#fff",
      }}
    >
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          ml: {
            xs: 0,
            md: "250px",
          },
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
