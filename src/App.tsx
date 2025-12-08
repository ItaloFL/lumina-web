import { RouterProvider } from "react-router-dom";
import { routes } from "./Router";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

export function App() {
  return (
    <>
      <HelmetProvider>
        <ToastContainer />
        <RouterProvider router={routes} />
      </HelmetProvider>
    </>
  );
}
