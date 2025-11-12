import { HiOutlineUser, HiOutlineCog, HiOutlineChartBar } from "react-icons/hi";
import { FaCartShopping } from "react-icons/fa6";
import { ROUTES } from "../../Routes/RouteConstants";

export const sideBarLinks = [
  {
    id: 1,
    label: "Dashboard",
    icon: FaCartShopping,
    path: ROUTES.DASHBOARD,
  },
  {
    id: 2,
    label: "Category",
    icon: HiOutlineUser,
    path: ROUTES.CATEGORY,
  },
  {
    id: 3,
    label: "Product",
    icon: HiOutlineChartBar,
    path: ROUTES.PRODUCT,
  },
  // {
  //   id: 4,
  //   label: "Report",
  //   icon: HiOutlineCog,
  //   path: ROUTES.REPORT,
  // },
];

