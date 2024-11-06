import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navigation } from "./components";

function Layout() {
  return (
    <>
      <main>
        <div className="row">
          <Navigation />
          <Outlet /> {/* Renders the matching child route */}
        </div>
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div className="container"><h1>Servers</h1></div>,
      },
      {
        path: "/logs",
        element: <div className="container"><h1>Logs</h1></div>,
      },
      {
        path: "/config",
        element: <div className="container"><h1>Config</h1></div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
