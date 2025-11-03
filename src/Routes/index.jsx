// src/routes/index.js
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./AllRoutes";
import { API_ROUTES } from "./ApiRoutes";

// createBrowserRouter should be called here
export const AppRouter = createBrowserRouter(routes);

export { API_ROUTES };