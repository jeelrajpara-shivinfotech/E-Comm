import MainLayout from "../Layouts/MainLayout";
import LoginPage from "../Page/LoginPage";
import Dashboard from "../Page/Dashboard";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      // You can easily add more routes here
      // { path: "profile", element: <ProfilePage /> },
    ],
  },
];