import { BellIcon, SearchIcon, UploadIcon } from "./icons";
import studyItLogo from "/favicon.svg";
export default function Header() {
  return (
    <div
      style={{
        width: "100%",
        paddingRight: "32px",
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
          maxWidth: "1280px",
          height: "64px",
          paddingRight: "0.02px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
          margin: "0 auto",
        }}
      >
        <img
          style={{ width: "151.21px", height: "56px", objectFit: "contain" }}
          src={studyItLogo}
          alt="StudyIT Logo"
        />

        <div style={{ paddingLeft: "32px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
          <div style={{ justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
            <div style={{ width: "68.08px", height: "20px", textAlign: "center", color: "#007BFF", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Home</div>
            <div style={{ width: "47.03px", height: "20px", textAlign: "center", color: "#475569", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>Documents</div>
            <div style={{ width: "94px", height: "20px", textAlign: "center", color: "#475569", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>About Us</div>
          </div>
        </div>

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

          <div style={{ padding: "8px 16px", background: "#007BFF", borderRadius: "12px", position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ color: "white" }}><UploadIcon size={12} /></div>
            <div style={{ color: "white", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Upload</div>
            <div style={{ position: "absolute", inset: 0, boxShadow: "0px 4px 6px -4px rgba(0,123,255,0.25), 0px 10px 15px -3px rgba(0,123,255,0.25)", borderRadius: "12px" }}></div>
          </div>

          <div style={{ width: "40px", height: "40px", borderRadius: "9999px", overflow: "hidden", outline: "2px solid #E2E8F0", outlineOffset: "-2px" }}>
            <img src="https://placehold.co/36x36" alt="Avatar" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}