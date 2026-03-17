import { useNavigate } from "react-router-dom";

export default function LatestDocuments() {
  const navigate = useNavigate();
  return (
    <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex" }}>
      <div style={{ alignSelf: "stretch", justifyContent: "space-between", alignItems: "center", display: "inline-flex" }}>
        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
            <div style={{ alignSelf: "stretch", height: "32px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}>
              Latest Documents
            </div>
          </div>
          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
            <div style={{ width: "203.69px", height: "20px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }}>
              Continuously updated by the community
            </div>
          </div>
        </div>

        <div
          style={{ justifyContent: "flex-start", alignItems: "center", display: "flex", cursor: "pointer" }}
          onClick={() => navigate("/documents")}
        >
          <div style={{ width: "71.75px", height: "20px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#007BFF", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
            
            View All
          </div>
          <div style={{ paddingLeft: "4px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
            <div style={{ width: "9.33px", height: "9.33px", background: "#007BFF" }}></div>
          </div>
        </div>
      </div>

      <div style={{ alignSelf: "stretch", justifyContent: "center", alignItems: "flex-start", gap: "24px", display: "inline-flex" }}>
        {/* Card 1 - React Fullstack */}
        <div
          style={{
            flex: "1 1 0",
            alignSelf: "stretch",
            background: "white",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            overflow: "hidden",
            borderRadius: "16px",
            outline: "1px solid #F1F5F9",
            outlineOffset: "-1px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div style={{ alignSelf: "stretch", height: "192px", position: "relative", background: "#E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "174px", height: "192px" }} src="https://placehold.co/174x192" alt="React Fullstack" />
            <div
              style={{
                padding: "2.5px 8px",
                position: "absolute",
                left: "12px",
                top: "9px",
                background: "#007BFF",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "63.53px", height: "15px", justifyContent: "center", display: "flex", flexDirection: "column", color: "white", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", lineHeight: "15px", letterSpacing: "0.25px" }}>
                Technology
              </div>
            </div>
          </div>

          <div style={{ alignSelf: "stretch", padding: "20px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", display: "flex" }}>
            <div style={{ alignSelf: "stretch", overflow: "hidden", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}>
                React Fullstack Programming Guide from A-Z
              </div>
            </div>

            <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <img style={{ width: "24px", height: "24px", borderRadius: "9999px" }} src="https://placehold.co/24x24" alt="Author" />
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "81.47px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  Nguyen Van A
                </div>
              </div>
              <div style={{ padding: "0 4px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "6.75px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>•</div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "63.17px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  10/10/2023
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                paddingTop: "12px",
                borderTop: "1px solid #F8FAFC",
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div style={{ justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "12.83px", height: "8.75px", background: "#94A3B8" }}></div>
                </div>
                <div style={{ width: "22.73px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#94A3B8", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                  1.2k
                </div>
              </div>

              <div style={{ padding: "6px", borderRadius: "8px", flexDirection: "column", justifyContent: "center", alignItems: "center", display: "inline-flex" }}>
                <div style={{ justifyContent: "center", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "14px", height: "18px", background: "#007BFF" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - C# Guide */}
        <div
          style={{
            flex: "1 1 0",
            alignSelf: "stretch",
            background: "white",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            overflow: "hidden",
            borderRadius: "16px",
            outline: "1px solid #F1F5F9",
            outlineOffset: "-1px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div style={{ alignSelf: "stretch", height: "192px", position: "relative", background: "#E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "192px", height: "192px", boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", border: "1px solid rgba(0,0,0,0)" }} src="https://placehold.co/192x192" alt="C#" />
            <div
              style={{
                padding: "2.5px 8px",
                position: "absolute",
                left: "12px",
                top: "9px",
                background: "#F97316",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "41.97px", height: "15px", textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column", color: "white", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", lineHeight: "15px", letterSpacing: "0.25px" }}>
                C#
              </div>
            </div>
          </div>

          <div style={{ alignSelf: "stretch", padding: "20px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", display: "flex" }}>
            <div style={{ alignSelf: "stretch", overflow: "hidden", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}>
                C# Programming Guide
              </div>
            </div>

            <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <img style={{ width: "24px", height: "24px", borderRadius: "9999px" }} src="https://placehold.co/24x24" alt="Author" />
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "57.77px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  Tran Thi B
                </div>
              </div>
              <div style={{ padding: "0 4px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "6.75px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>•</div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "65.73px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  09/10/2023
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                paddingTop: "12px",
                borderTop: "1px solid #F8FAFC",
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div style={{ justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "12.83px", height: "8.75px", background: "#94A3B8" }}></div>
                </div>
                <div style={{ width: "22.55px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#94A3B8", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                  850
                </div>
              </div>

              <div style={{ padding: "6px", borderRadius: "8px", flexDirection: "column", justifyContent: "center", alignItems: "center", display: "inline-flex" }}>
                <div style={{ justifyContent: "center", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "14px", height: "18px", background: "#007BFF" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - HTML Self-study */}
        <div
          style={{
            flex: "1 1 0",
            alignSelf: "stretch",
            background: "white",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            overflow: "hidden",
            borderRadius: "16px",
            outline: "1px solid #F1F5F9",
            outlineOffset: "-1px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div style={{ alignSelf: "stretch", height: "192px", position: "relative", background: "#E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "192px", height: "192px" }} src="https://placehold.co/192x192" alt="HTML" />
            <div
              style={{
                padding: "2.5px 8px",
                position: "absolute",
                left: "12px",
                top: "9px",
                background: "#22C55E",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "68.36px", height: "15px", textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column", color: "white", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", lineHeight: "15px", letterSpacing: "0.25px" }}>
                HTML
              </div>
            </div>
          </div>

          <div style={{ alignSelf: "stretch", padding: "20px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", display: "flex" }}>
            <div style={{ alignSelf: "stretch", overflow: "hidden", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}>
                Self-study HTML
              </div>
            </div>

            <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <img style={{ width: "24px", height: "24px", borderRadius: "9999px" }} src="https://placehold.co/24x24" alt="Author" />
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "51.41px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  Le Van C
                </div>
              </div>
              <div style={{ padding: "0 4px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "6.75px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>•</div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "65.72px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  08/10/2023
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                paddingTop: "12px",
                borderTop: "1px solid #F8FAFC",
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div style={{ justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "12.83px", height: "8.75px", background: "#94A3B8" }}></div>
                </div>
                <div style={{ width: "21.67px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#94A3B8", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                  2.1k
                </div>
              </div>

              <div style={{ padding: "6px", borderRadius: "8px", flexDirection: "column", justifyContent: "center", alignItems: "center", display: "inline-flex" }}>
                <div style={{ justifyContent: "center", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "17.77px", height: "18.38px", background: "#007BFF" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 - IT Life (Book) */}
        <div
          style={{
            flex: "1 1 0",
            alignSelf: "stretch",
            background: "white",
            boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
            overflow: "hidden",
            borderRadius: "16px",
            outline: "1px solid #F1F5F9",
            outlineOffset: "-1px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div style={{ alignSelf: "stretch", height: "192px", position: "relative", background: "#E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "131px", height: "189px" }} src="https://placehold.co/131x189" alt="IT Life Book" />
            <div
              style={{
                width: "77px",
                padding: "2.5px 8px",
                position: "absolute",
                left: "12px",
                top: "8.81px",
                background: "#A855F7",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "62px", height: "15px", textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column", color: "white", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", lineHeight: "15px", letterSpacing: "0.25px" }}>
                BOOK
              </div>
            </div>
          </div>

          <div style={{ alignSelf: "stretch", padding: "20px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px", display: "flex" }}>
            <div style={{ alignSelf: "stretch", overflow: "hidden", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}>
                IT Life
              </div>
            </div>

            <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <img style={{ width: "24px", height: "24px", borderRadius: "9999px" }} src="https://placehold.co/24x24" alt="Author" />
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "75.36px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  Pham Minh D
                </div>
              </div>
              <div style={{ padding: "0 4px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "6.75px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>•</div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "64.86px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "12px", fontWeight: 400, lineHeight: "16px" }}>
                  07/10/2023
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                paddingTop: "12px",
                borderTop: "1px solid #F8FAFC",
                justifyContent: "space-between",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div style={{ justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "12.83px", height: "8.75px", background: "#94A3B8" }}></div>
                </div>
                <div style={{ width: "25.48px", height: "16px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#94A3B8", fontSize: "12px", fontWeight: 500, lineHeight: "16px" }}>
                  3.4k
                </div>
              </div>

              <div style={{ padding: "6px", borderRadius: "8px", flexDirection: "column", justifyContent: "center", alignItems: "center", display: "inline-flex" }}>
                <div style={{ justifyContent: "center", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "14px", height: "18px", background: "#007BFF" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}