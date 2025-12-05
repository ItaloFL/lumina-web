import { createBrowserRouter } from "react-router";
import { Login } from "./pages/login";
import { NotFound } from "./pages/404";
import { Layout } from "./pages/layout";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgot-password";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
