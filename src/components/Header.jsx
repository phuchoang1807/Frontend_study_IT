export default function Header() {
  return (
    <div
      style={{
        width: "1280px",
        paddingRight: "32px",
        position: "absolute",
        left: 0,
        top: 0,
        background: "rgba(255, 255, 255, 0.80)",
        borderBottom: "1px solid #E2E8F0",
        backdropFilter: "blur(6px)",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "inline-flex",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "1248px",
          height: "64px",
          paddingRight: "0.02px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "inline-flex",
          margin: "0 auto",
        }}
      >
        <img
          style={{
            width: "151.21px",
            height: "116.15px",
            paddingBottom: "24px",
            transform: "rotate(-1deg)",
            transformOrigin: "top left",
          }}
          src="https://placehold.co/151x116"
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
            <div style={{ position: "absolute", left: "12.4px", top: "12px" }}>
              <div style={{ width: "15px", height: "15px", background: "#94A3B8" }}></div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ padding: "8px", position: "relative", borderRadius: "9999px" }}>
            <div style={{ width: "16px", height: "20px", background: "#64748B" }}></div>
            <div style={{ width: "8px", height: "8px", background: "#EF4444", borderRadius: "9999px", border: "2px solid white", position: "absolute", left: "14px", top: "8px" }}></div>
          </div>

          <div style={{ padding: "8px 16px", background: "#007BFF", borderRadius: "12px", position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "12px", height: "12px", background: "white" }}></div>
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