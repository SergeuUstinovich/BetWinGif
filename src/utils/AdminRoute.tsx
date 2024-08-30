import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getAdminCheck } from "../providers/StoreProvider/selectors/getAdminCheck";

interface privateRouteProps {
  children: ReactNode;
}

function AdminRoute({ children }: privateRouteProps) {
  const admin = useSelector(getAdminCheck)

  if (!admin) {
    return <Navigate to={"/auths"} replace />;
  }
  return children;
}

export default AdminRoute;
