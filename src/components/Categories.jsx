export default function Categories() {
  return (
    <div style={{ width: "1215px", height: "248px", background: "#F5F7F8", display: "flex", flexDirection: "column", gap: "0" }}>
      <div style={{ width: "1215px", height: "47px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>Document Categories</div>
      </div>

      <div style={{ width: "1215px", display: "flex", gap: "16px", justifyContent: "center", alignItems: "flex-start" }}>
        {/* Docker */}
        <div style={{ width: "194.66px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "60.33px 0",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/Docker.png" alt="Docker" style={{ width: "42px", height: "39px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Docker</div>
          </div>
        </div>

        {/* Java */}
        <div style={{ width: "194.67px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "60.33px 0 60.34px",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/Java.png" alt="Java" style={{ width: "39px", height: "39px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Java</div>
          </div>
        </div>

        {/* Unity */}
        <div style={{ width: "195px", height: "194px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: "194px",
              padding: "60.33px 0 60.34px",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/Unity.png" alt="Unity" style={{ width: "39px", height: "39px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Unity</div>
          </div>
        </div>

        {/* MySQL */}
        <div style={{ width: "194.66px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "60.33px 0",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/MySQL.png" alt="MySQL" style={{ width: "42px", height: "39px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>MySQL</div>
          </div>
        </div>

        {/* SQL Server */}
        <div style={{ width: "194.67px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "60.33px 0 60.34px",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/SQLServer.png" alt="SQL Server" style={{ width: "57px", height: "41px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px", width: "92.56px" }}>SQL Server</div>
          </div>
        </div>

        {/* Firebase */}
        <div style={{ width: "194.67px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "60.33px 0 60.34px",
              background: "white",
              borderRadius: "16px",
              outline: "1px solid rgba(0,0,0,0)",
              outlineOffset: "-1px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/imgs/Firebase.png" alt="Firebase" style={{ width: "40px", height: "45px" }} />
            <div style={{ color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>Firebase</div>
          </div>
        </div>
      </div>
    </div>
  );
}