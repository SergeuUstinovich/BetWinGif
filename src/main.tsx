import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import { useEffect } from "react";
import KTComponent from "./metronic/core/index.ts";
import KTLayout from "./metronic/app/layouts/demo1.js";
import { BrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { router } from "./utils/TstNavRoute.tsx";

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, [location]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterProvider router={router}>
        <Main />
      </RouterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
