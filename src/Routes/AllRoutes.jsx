import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Page/LoginPage";
import Dashboard from "../Page/Dashboard";
import { ROUTES } from "./RouteConstants";

export const routes = [
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    ],
  },
];
