import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface privateRouteProps {
  children: ReactNode
}

function PrivateRoute({ children }: privateRouteProps) {
<<<<<<< Updated upstream
  const token = "1";
=======
  const token = '1'
>>>>>>> Stashed changes
  if (!token) {
    return <Navigate to={'/auth'} replace />
  }
  return children
}

export default PrivateRoute
