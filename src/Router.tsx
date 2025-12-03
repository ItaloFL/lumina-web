import { createBrowserRouter } from "react-router";
import { Login } from "./pages/login";
import { NotFound } from "./pages/404";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
]);
