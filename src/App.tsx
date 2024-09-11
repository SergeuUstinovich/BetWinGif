import "./styles/App.scss";
import { lazy, Suspense, useEffect } from "react";
import KTComponent from "./metronic/core/index.ts";
import KTLayout from "./metronic/app/layouts/demo1.js";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import ProtectedRoute from "./utils/ProtectedAuth.tsx";
import AdminRoute from "./utils/AdminRoute.tsx";
import { Football } from "./pages/Football/Football.tsx";

const Layout = lazy(() => import("./pages/Layout/Layout.tsx"));
const StaticBanners = lazy(
  () => import("./pages/StaticBanners/StaticBanner.tsx")
);
const GifBanners = lazy(() => import("./pages/GifBanners/GifBanners.tsx"));
const AdminPanel = lazy(() => import("./pages/AdminPanel/AdminPanel.tsx"));
const AdminGifPanel = lazy(() => import("./pages/AdminGifPanel/AdminGifPanel.tsx"));
const AccoutSetting = lazy(
  () => import("./pages/AccoutSetting/AccoutSetting.tsx")
);
const NewImageAdmin = lazy(
  () => import("./AdminComponent/NewImageAdmin/NewImageAdmin.tsx")
);
const NewGifAdmin = lazy(
  () => import("./AdminComponent/NewGifAdmin/NewGifAdmin.tsx")
);
const OldImageAdmin = lazy(
  () => import("./AdminComponent/OldImageAdmin/OldImageAdmin.tsx")
);
const OldGifAdmin = lazy(
  () => import("./AdminComponent/OldGifAdmin/OldGifAdmin.tsx")
);


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
            <Route path={"football-sport"} element={<Football />} />
            <Route
              path={"/admin-meneger"}
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            >
              <Route path={"new/:picture_id"} element={<NewImageAdmin />} />
              <Route
                path={"old/:full_picture_id"}
                element={<OldImageAdmin />}
              />
            </Route>
            <Route
              path={"/admin-meneger-gif"}
              element={
                <AdminRoute>
                  <AdminGifPanel />
                </AdminRoute>
              }
            >
              <Route path={"new/:picture_id"} element={<NewGifAdmin />} />
              <Route
                path={"old/:full_picture_id"}
                element={<OldGifAdmin />}
              />
            </Route>
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
