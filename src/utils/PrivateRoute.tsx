import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface privateRouteProps {
    children: ReactNode
}

function PrivateRoute({children}: privateRouteProps) {
    const token = undefined
    if(!token) {
        return <Navigate to={'/auth'} replace />
    }
    return children
}

export default PrivateRoute