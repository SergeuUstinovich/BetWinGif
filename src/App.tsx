import "./styles/App.scss";
import { lazy, Suspense, useEffect } from "react";
import KTComponent from "./metronic/core/index.ts";
import KTLayout from "./metronic/app/layouts/demo1.js";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import ProtectedRoute from "./utils/ProtectedAuth.tsx";
import AdminRoute from "./utils/AdminRoute.tsx";

const Layout = lazy(() => import("./pages/Layout/Layout.tsx"));
const StaticBanners = lazy(
  () => import("./pages/StaticBanners/StaticBanner.tsx")
);
const GifBanners = lazy(() => import("./pages/GifBanners/GifBanners.tsx"));
const MenegerAdmin = lazy(() => import("./component/MenegerAdmin/MenegerAdmin.tsx"));
const AccoutSetting = lazy(() => import("./pages/AccoutSetting/AccoutSetting.tsx"));

const AuthForm = lazy(() => import("./component/AuthForm/AuthForm.tsx"));
const CheckedAuth = lazy(
  () => import("./component/CheckedAuth/CheckedAuth.tsx")
);
const ForgotPassword = lazy(
  () => import("./component/ForgotPassword/ForgotPassword.tsx")
);
const ForgotNewPassword = lazy(
  () => import("./component/ForgotNewPassword/ForgotNewPassword.tsx")
);

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
            <Route path={"gif-banners"} element={<GifBanners />} />
            <Route path={"account-setting"} element={<AccoutSetting />} />
            <Route
              path={"admin-meneger"}
              element={
                <AdminRoute>
                  <MenegerAdmin />
                </AdminRoute>
              }
            />
          </Route>
          <Route path={"/auths"} element={<Auth />}>
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
            <Route
              path={"forgot-password/:uid/:token"}
              element={<ForgotNewPassword />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
