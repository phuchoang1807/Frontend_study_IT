import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasAnyPermission } from "../utils/permissionUtils";

export default function ProtectedRoute({
  children,
  requiredPermissions,
}) {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuth();

  // Tránh flicker: chờ context init xong
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const allowed = hasAnyPermission(user, requiredPermissions);
    if (!allowed) {
      return (
        <div style={{ padding: "2rem" }}>
          <h1>403 Forbidden</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      );
    }
  }

  return children;
}

