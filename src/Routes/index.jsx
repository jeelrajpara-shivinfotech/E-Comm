
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./AllRoutes";
import { API_ROUTES } from "./ApiRoutes";

export const AppRouter = createBrowserRouter(routes);
export { API_ROUTES };
