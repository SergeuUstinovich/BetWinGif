import "./styles/App.scss";
import { lazy, Suspense, useEffect } from "react";
import KTComponent from "./metronic/core/index.ts";
import KTLayout from "./metronic/app/layouts/demo1.js";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import { StaticBanners } from "./pages/StaticBanners";
import Auth from "./pages/Auth/Auth.tsx";
import CheckedAuth from "./component/CheckedAuth/CheckedAuth.tsx";
import ProtectedRoute from "./utils/ProtectedAuth.tsx";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword.tsx";
import ForgotNewPassword from "./component/ForgotNewPassword/ForgotNewPassword.tsx";
import { GifBanners } from "./pages/GifBanners/";

const Layout = lazy(() => import("./pages/Layout/Layout"));
const AuthForm = lazy(() => import("./component/AuthForm/AuthForm.tsx"));

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
            <Route path={"/static-banners"} element={<StaticBanners />} />
            <Route path={"/gif-banners"} element={<GifBanners />} />
          </Route>
          <Route path={"/auth"} element={<Auth />}>
            <Route index element={<AuthForm />} />
            <Route
              path={"check"}
              element={
                <ProtectedRoute>
                  <CheckedAuth />
                </ProtectedRoute>
              }
            />
            <Route path={"forgot"} element={<ForgotPassword />} />
            <Route path={"forgot-password"} element={<ForgotNewPassword />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
