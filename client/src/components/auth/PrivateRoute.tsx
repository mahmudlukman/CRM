import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const AuthLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <span>Loading...</span>
  </div>
);

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  // Still confirming session on refresh — don't redirect yet
  if (!isInitialized) {
    return <AuthLoader />;
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but role not allowed
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // Authenticated and authorized - render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
