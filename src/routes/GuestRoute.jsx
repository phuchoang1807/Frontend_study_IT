import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Chờ init auth (fetchMe) xong để tránh redirect sai
  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

