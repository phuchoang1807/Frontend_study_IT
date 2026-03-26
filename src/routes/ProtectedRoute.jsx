import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { hasAnyPermission } from "../utils/permissionUtils";

export default function ProtectedRoute({
  children,
  requiredPermissions,
  requiredRoles,
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

  // Check roles first if provided
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = user.roles.some(role => requiredRoles.includes(role));
    if (!hasRole) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>403 Forbidden</h1>
          <p>Bạn không có quyền truy cập trang này (Yêu cầu quyền: {requiredRoles.join(", ")}).</p>
        </div>
      );
    }
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const allowed = hasAnyPermission(user, requiredPermissions);
    if (!allowed) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>403 Forbidden</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      );
    }
  }

  return children;
}

