import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Page/LoginPage";
import Dashboard from "../Page/DashBoard/Dashboard";
import Category from "../Page/DashBoard/Category";
import Ecommerce from "../Page/DashBoard/E-Commerce";
import { ROUTES } from "./RouteConstants";

export const routes = [
  {
    path: ROUTES.ROOT, 
    element: <MainLayout />,
    children: [
      { index: true, element: <LoginPage /> }, // ✅ this is fine — default "/" route

      {
        path: ROUTES.DASHBOARD, // "/dashboard"
        element: <Dashboard />,
        children: [
          { index: true, element: <Ecommerce /> }, // ✅ default child route for /dashboard
          { path: ROUTES.CATEGORY, element: <Category /> }, // ✅ relative path (not /dashboard/category)
        ],
      },
    ],
  },
];
