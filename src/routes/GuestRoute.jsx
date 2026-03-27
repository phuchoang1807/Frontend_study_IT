import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userHasAdminPortalRole } from "../constants/adminPortalRoles";

export default function GuestRoute({ children, adminPortal = false }) {
  const { isAuthenticated, initializing, user } = useAuth();

  if (initializing) return null;

  if (!isAuthenticated) {
    return children;
  }

  if (adminPortal) {
    if (userHasAdminPortalRole(user?.roles)) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/" replace />;
}
