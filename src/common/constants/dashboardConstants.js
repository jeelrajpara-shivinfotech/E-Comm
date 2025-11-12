import { FaShoppingBag, FaUser, FaBox, FaTimesCircle, FaClock } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";

export const dashboardCardConstants = [
  {
    id: 1,
    title: "Total Orders",
    key: "total_order",
    icon: FaShoppingBag,
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "Cancelled Orders",
    key: "total_cancel_order",
    icon: CiCircleAlert,
    color: "#EF4444",
  },
  {
    id: 3,
    title: "Pending Orders",
    key: "total_pending_order",
    icon: FaClock,
    color: "#FACC15",
  },
  {
    id: 4,
    title: "Customers",
    key: "total_customer",
    icon: FaUser,
    color: "#22C55E",
  },
  {
    id: 5,
    title: "Products",
    key: "total_product",
    icon: FaBox,
    color: "#8B5CF6",
  },
];

export const dashboardHeaders = {
  dashboardOverView : "Dashboard Overview",
  ordersOverView : "Orders Overview",
  highestPurchaseOrder : "Highest Purchase Order",
  userReport : "User Report", 
  orderReport : "Order Report",
  noUserFound : "No user found",
  noOrderFound : "No order found"
}

export const dashboardTableHeaders = {
  label1 : "S.No",
  label2 : "User ID",
  label3 : "User Name",
  label4 : "Total Price"
}

export const pieChartTabs = [
  "year", "month"
]

export const userReportColumn = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "E-Mail", sortable: true },
    { key: "phone_number", label: "Phone", sortable: true },
    { key: "gender", label: "Gender", sortable: true },
]

export const orderReportColumns = [
  { key: "id", label: "Order Id", sortable: true },
  { key: "order_name", label: "Order Name" },
  { key: "name", label: "Customer Name" },
  { key: "order_amount", label: "Amount", render: (v) => `₹${v}` },
  { key: "total_items", label: "Total Items" },
];

export const pieChartColor = ["#FACC15", "#5ED5C8", "#1E7E68"];

export const placeHolderConst = {
  userPlaceHolder : "Search by name or email...",
  orderPlaceHolder : "Search by order or customer...",
  categoryPlaceHolder : "Search by category name"
}

export const dashboardMainConstants = {
  openSideBar : "Open sidebar",
  signOut : "Sign out",
  confirmationButton : "Yes",
  signOutConfirmation : "Are you sure you want to sign out?"
}