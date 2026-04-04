import { getAvatarDisplay, userHasAvatar } from "../utils/avatarDisplay";

/**
 * @param {{ user: import("../api/authApi").UserInfo | null | undefined; size?: "header" | "profile" }} props
 */
export default function UserAvatarDisplay({ user, size = "header" }) {
  const isImage = userHasAvatar(user);
  const display = getAvatarDisplay(user);

  if (size === "header") {
    return isImage ? (
      <img
        src={display}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
        }}
      />
    ) : (
      <span
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E2E8F0",
          color: "#475569",
          fontSize: "15px",
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        {display}
      </span>
    );
  }

  return isImage ? (
    <img src={display} alt="" className="avatar-img" />
  ) : (
    <div
      className="avatar-img avatar-fallback"
      role="img"
      aria-label={user?.fullName || user?.email || "Avatar"}
    >
      {display}
    </div>
  );
}
