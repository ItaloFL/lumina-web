import { RouterProvider } from "react-router";
import { routes } from "./Router";

export function App() {
  return <RouterProvider router={routes} />;
}
