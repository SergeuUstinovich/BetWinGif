import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getTokenUser } from "../providers/StoreProvider/selectors/getTokenUser";

interface privateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: privateRouteProps) {
  const token = useSelector(getTokenUser)
  if (!token) {
    return <Navigate to={"/auth"} replace />;
  }
  return children;
}

export default PrivateRoute;
