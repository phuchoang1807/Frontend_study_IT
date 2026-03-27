import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const allowed = user?.roles?.some((r) => requiredRoles.includes(r));
    if (!allowed) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
