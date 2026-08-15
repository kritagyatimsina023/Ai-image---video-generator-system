import { delay } from "@/shared/Delay";
import { getRecentActivities } from "../actions/Dashboard.action";
import Activity from "./Activity";

const DashboardActivity = async () => {
  //   await delay(3000);
  const activities = await getRecentActivities();
  return <Activity activities={activities} />;
};

export default DashboardActivity;
