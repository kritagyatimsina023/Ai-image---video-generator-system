import { Box, Stack, Typography } from "@mui/material";

import UserTable from "./UserTable";
import { getUsers } from "../../actions/users/userActions";
import { Suspense } from "react";
import UserTableSkeleton from "./userTableSkeleton";
import UserTableData from "./UserTableData";

const UserPage = async () => {
  const users = await getUsers();
  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              letterSpacing: "-.03em",
            }}
          >
            Users
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "rgba(255,255,255,.45)",
            }}
          >
            Manage users, credits and account status.
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            color: "rgba(255,255,255,.4)",
          }}
        >
          {users.length} users
        </Typography>
      </Stack>
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTableData />
      </Suspense>
    </Box>
  );
};

export default UserPage;
