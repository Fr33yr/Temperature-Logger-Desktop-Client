import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Config, Servers, Logs } from "./pages";
import { Navigation } from "./components";
import { ReduxProvider } from "./redux/provider";

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
        element: (
          <div className="container">
            <Servers />
          </div>
        ),
      },
      {
        path: "/logs",
        element: (
          <div className="container">
            <Logs />
          </div>
        ),
      },
      {
        path: "/config",
        element: (
          <div className="container">
            <Config />
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
