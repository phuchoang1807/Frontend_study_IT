import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissionUtils";

export default function Dashboard() {
  const { user } = useAuth();

  const canView = hasPermission(user, "USER_READ");
  const canEdit = hasPermission(user, "USER_WRITE");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>This is a placeholder dashboard page.</p>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
        {canView && <button className="primary-button">View</button>}
        {canEdit && (
          <button className="secondary-button" type="button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

