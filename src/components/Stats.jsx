export default function Stats() {
  return (
    <div style={{ alignSelf: "stretch", display: "flex", gap: "16px", justifyContent: "center", alignItems: "flex-start" }}>
      {/* Documents */}
      <div
        style={{
          flex: "1 1 0",
          padding: "24px",
          background: "white",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          borderRadius: "16px",
          outline: "1px solid #F1F5F9",
          outlineOffset: "-1px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ padding: "12px", background: "#EFF6FF", borderRadius: "12px" }}>
          <div style={{ width: "16px", height: "20px", background: "#2563EB" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>Documents</div>
          <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>12,402</div>
        </div>
      </div>

      {/* Members */}
      <div
        style={{
          flex: "1 1 0",
          padding: "24px",
          background: "white",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          borderRadius: "16px",
          outline: "1px solid #F1F5F9",
          outlineOffset: "-1px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ padding: "12px", background: "#F0FDF4", borderRadius: "12px" }}>
          <div style={{ width: "22px", height: "16px", background: "#16A34A" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>Members</div>
          <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>8,910</div>
        </div>
      </div>

      {/* Downloads */}
      <div
        style={{
          flex: "1 1 0",
          padding: "24px",
          background: "white",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          borderRadius: "16px",
          outline: "1px solid #F1F5F9",
          outlineOffset: "-1px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ padding: "12px", background: "#FFF7ED", borderRadius: "12px" }}>
          <div style={{ width: "16px", height: "16px", background: "#EA580C" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>Downloads</div>
          <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>45.2k</div>
        </div>
      </div>

      {/* Contributions */}
      <div
        style={{
          flex: "1 1 0",
          padding: "24px",
          background: "white",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          borderRadius: "16px",
          outline: "1px solid #F1F5F9",
          outlineOffset: "-1px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ padding: "12px", background: "#FAF5FF", borderRadius: "12px" }}>
          <div style={{ width: "20px", height: "19px", background: "#9333EA" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ color: "#64748B", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>Contributions</div>
          <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>1.5k</div>
        </div>
      </div>
    </div>
  );
}