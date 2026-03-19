import { BellIcon, SearchIcon, UploadIcon } from "./icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import studyItLogo from "/favicon.svg";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import UserPopup from "./UserPopup";

const navLinkBaseStyle = {
  textAlign: "center",
  fontSize: "14px",
  lineHeight: "20px",
  textDecoration: "none",
};
export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showUserPopup, setShowUserPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowUserPopup(false);
    if (showUserPopup) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showUserPopup]);

  return (
    <div
      style={{
        width: "100%",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        background: "rgba(255, 255, 255, 0.80)",
        borderBottom: "1px solid #E2E8F0",
        backdropFilter: "blur(6px)",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          
          height: "64px",
          paddingRight: "0.02px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
          
        }}
      >
        <NavLink
          to="/"
          aria-label="Go to home"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <img
            style={{ width: "151.21px", height: "56px", objectFit: "contain" }}
            src={studyItLogo}
            alt="StudyIT Logo"
          />
        </NavLink>
<nav
          style={{
            paddingLeft: "32px",
            width: "280px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...navLinkBaseStyle,
              color: isActive ? "#007BFF" : "#475569",
              fontWeight: isActive ? 600 : 500,
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/documents"
            style={({ isActive }) => ({
              ...navLinkBaseStyle,
              color: isActive ? "#007BFF" : "#475569",
              fontWeight: isActive ? 600 : 500,
            })}
          >
            Documents
          </NavLink>
          <NavLink
            to="/style-guide"
            style={({ isActive }) => ({
              ...navLinkBaseStyle,
              color: isActive ? "#007BFF" : "#475569",
              fontWeight: isActive ? 600 : 500,
            })}
          >
            About Us
          </NavLink>
        </nav>

        <div style={{ flex: "1 1 0", maxWidth: "512px", paddingLeft: "32px", paddingRight: "32px" }}>
          <div style={{ width: "100%", maxWidth: "448px", position: "relative" }}>
            <div style={{ padding: "9px 16px 10px 40px", background: "#F1F5F9", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ color: "#6B7280", fontSize: "14px", fontWeight: 400 }}>Search documents...</div>
            </div>
            <div style={{ position: "absolute", left: "12.4px", top: "12px", color: "#94A3B8" }}>
              <SearchIcon size={15} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
 <button
            type="button"
            aria-label="Notifications"
            style={{
              width: "36px",
              height: "36px",
              padding: "0",
              position: "relative",
              border: "none",
              background: "transparent",
              borderRadius: "9999px",
              color: "#1E2A78",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <BellIcon size={20} strokeWidth={1.7} />
            <span
              style={{
                width: "8px",
                height: "8px",
                background: "#EF4444",
                borderRadius: "9999px",
                border: "2px solid white",
                position: "absolute",
                right: "6px",
                top: "6px",
              }}
            />
          </button>

          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/contributor-request")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/contributor-request")}
            style={{
              padding: "8px 16px",
              background: "#007BFF",
              borderRadius: "12px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <div style={{ color: "white" }}>
              <UploadIcon size={12} />
            </div>
            <div
              style={{
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
              }}
            >
              Upload
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow:
                  "0px 4px 6px -4px rgba(0,123,255,0.25), 0px 10px 15px -3px rgba(0,123,255,0.25)",
                borderRadius: "12px",
              }}
            />
          </div>

          {isAuthenticated ? (
            <div style={{ position: "relative" }}>
              <div
                title="Profile"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserPopup(!showUserPopup);
                }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  outline: "2px solid #E2E8F0",
                  outlineOffset: "-2px",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://placehold.co/36x36"
                  alt="Avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              {showUserPopup && <UserPopup onClose={() => setShowUserPopup(false)} />}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: "1px solid #CBD5E1",
                  background: "white",
                  color: "#0F172A",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                style={{
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background: "#007BFF",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                  textDecoration: "none",
                  boxShadow:
                    "0px 4px 6px -4px rgba(0,123,255,0.25), 0px 10px 15px -3px rgba(0,123,255,0.25)",
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}