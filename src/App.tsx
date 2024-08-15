import "./styles/App.scss";
import { lazy, Suspense, useEffect } from "react";
import KTComponent from "./metronic/core/index.ts";
import KTLayout from "./metronic/app/layouts/demo1.js";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import { StaticBanners } from "./pages/StaticBanners/StaticBanner.tsx";

const Layout = lazy(() => import("./pages/Layout/Layout"));
const AuthForm = lazy(() => import("./pages/AuthForm/AuthForm.tsx"));

function App() {
  useEffect(() => {
    KTComponent.init();
    KTLayout.init();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path={"/"}
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<StaticBanners />} />
          </Route>
          <Route path={"/auth"} element={<AuthForm />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
