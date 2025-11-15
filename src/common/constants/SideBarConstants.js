import {
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineChartBar,
} from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { ROUTES } from "../../Routes/RouteConstants";

export const sideBarLinks = [
  {
    id: 1,
    label: "Dashboard",
    icon: MdDashboard, 
    path: ROUTES.DASHBOARD,
  },
  {
    id: 2,
    label: "Category",
    icon: FaTags, 
    path: ROUTES.CATEGORY,
  },
  {
    id: 3,
    label: "Product",
    icon: FaCartShopping, 
    path: ROUTES.PRODUCT,
  },
  {
    id: 4,
    label: "Report",
    icon: HiOutlineChartBar, 
    path: ROUTES.REPORT,
  },
];
