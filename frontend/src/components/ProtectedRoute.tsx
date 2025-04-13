import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth-service'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoadingUser } = useAuth()
  const location = useLocation()

  if (isLoadingUser) {
    return null // or a loading spinner
  }

  if (!user) {
    // Redirect to login but save the attempted url
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
