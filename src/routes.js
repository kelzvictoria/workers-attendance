import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Directorates from "views/Directorates/Directorates.js";
// core components/views for RTL layout
import Attendance from "views/Attendance/Attendance.js";
import Workers from "views/Workers/Workers.js";
import MinistryArm from "views/MinistryArm/MinistryArm.js";
import Users from "views/Users/Users.js";

import Event from "@material-ui/icons/Event";
import PermContactCalendar from "@material-ui/icons/PermContactCalendar"

import LogOut from "./components/auth/LogOut";

import { GroupWork } from "@material-ui/icons";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Details from "views/MinistryArm/Details";
import DirectorateDetails from "views/Directorates/Details"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/attendance",
    name: "Attendance",
    icon: Event,
    component: Attendance,
    layout: "/admin",
  },
  {
    path: "/workers",
    name: "Workers",
    icon: PermContactCalendar,
    component: Workers,
    layout: "/admin",
  },
  {
    path: "/ministry-arm",
    name: "Ministry Arms",
    icon: GroupWork,
    component: MinistryArm,
    layout: "/admin",
  },
  {
    path: "/ministry-arm-details",
    name: "Ministry Arm Details",
    icon: GroupWork,
    component: Details,
    layout: "/admin",
  },

  {
    path: "/directorate-details",
    name: "Directorate Details",
    icon: GroupWork,
    component: DirectorateDetails,
    layout: "/admin",
  },
  {
    path: "/directorates",
    name: "Directorates",
    icon: AccountBalance,
    component: Directorates,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
    component: Users,
    layout: "/admin",
  },


  {
    path: "/logout",
    name: "Log Out",
    component: LogOut,
    icon: Person,
    layout: "/admin",
  },

];

export default dashboardRoutes;
