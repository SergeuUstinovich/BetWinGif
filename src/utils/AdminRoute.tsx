import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../providers/StoreProvider/selectors/getUser";

interface privateRouteProps {
  children: ReactNode;
}

function AdminRoute({ children }: privateRouteProps) {
  const admin = useSelector(getUser)

  if (!admin?.is_admin) {
    return <Navigate to={"/"} replace />;
  }
  return children;
}

export default AdminRoute;
