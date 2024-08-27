import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { emailName } = location.state || {};

  if (!emailName) {
    return <Navigate to={"/auths"} replace />;
  }

  return children;
}

export default ProtectedRoute;
