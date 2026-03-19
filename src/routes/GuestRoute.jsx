import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  // Only hide content while checking auth on first load; keep form visible during login submit
  if (initializing) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

