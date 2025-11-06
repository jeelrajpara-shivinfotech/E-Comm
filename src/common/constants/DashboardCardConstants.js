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
  orderReport : "Order Report"
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

export const userReport = {
  phone : "Phone",
  email : "Email",
  gender : "Gender",
  name : "Name",
  page : "Page",
  of : "of",
  noUsers : "No users found.",
  previous : "Previous",
  next : "Next",
  sortBy : "Sort By",
  rowsPerPage : "Rows Per Page"
}

export const orderReport = {
  orderId : "Order ID",
  customerName : "Customer Name", 
  orderAmount : "Order Amount",
  orderName : "Order Name",
  totalItems : "Total Items",
  page : "Page",  
  of : "of",
  noOrders : "No orders found.",
  previous : "Previous",
  next : "Next",
  rowsPerPage : "Rows per page"
}

export const pieChartColor = ["#FACC15", "#5ED5C8", "#1E7E68"];