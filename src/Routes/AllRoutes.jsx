import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Page/LoginPage";
import Dashboard from "../Layouts/DashboardLayout";
import Category from "../Page/DashBoard/Category";
import Ecommerce from "../Page/DashBoard/E-Commerce";
import { ROUTES } from "./RouteConstants";

export const routes = [
  {
    path: ROUTES.ROOT, 
    element: <MainLayout />,
    children: [
      { index: true, element: <LoginPage /> }, 
      {
        path: ROUTES.DASHBOARD, 
        element: <Dashboard />,
        children: [
          { index: true, element: <Ecommerce /> }, 
          { path: ROUTES.CATEGORY, element: <Category /> }, 
        ],
      },
    ],
  },
];
