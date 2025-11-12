import { Navigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Page/LoginPage";
import Dashboard from "../Layouts/DashboardLayout";
import Category from "../Page/DashBoard/Category";
import Ecommerce from "../Page/DashBoard/E-Commerce";
import { ROUTES } from "./RouteConstants";
import Product from "../Page/DashBoard/Product";

export const routes = [
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.LOGIN} replace /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },

      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
        children: [
          { index: true, element: <Ecommerce /> },
        ],
      },

      {
        path: ROUTES.CATEGORY,
        element: <Dashboard />,
        children: [
          { index: true, element: <Category /> },
        ],
      },

      {
        path : ROUTES.PRODUCT,
        element : <Dashboard/>,
        children : [
          {index : true , element : <Product/>}
        ]
      }
    ],
  },
];

