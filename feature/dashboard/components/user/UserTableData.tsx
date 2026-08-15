import { getUsers } from "../../actions/users/userActions";
import UserTable from "./UserTable";

const UserTableData = async () => {
  const users = await getUsers();

  return <UserTable users={users} />;
};

export default UserTableData;
