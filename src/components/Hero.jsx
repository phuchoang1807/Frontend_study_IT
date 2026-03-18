import { SearchIcon } from "./icons";

export default function Hero() {
  return (
    <div
      style={{
        alignSelf: "stretch",
        minHeight: "400px",
        padding: "32px",
        position: "relative",
        background: "#0F172A",
        overflow: "hidden",
        borderRadius: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1216px",
          height: "404px",
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0.4,
          mixBlendMode: "overlay",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(174deg, #007BFF 0%, rgba(0,123,255,0) 50%, #9333EA 100%)",
          }}
        />
      </div>

      {/* ✅ CHỈ SỬA CHỖ NÀY: gap từ 24 -> 40 */}
      <div
        style={{
          width: "768px",
          maxWidth: "768px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          paddingTop: "24px",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          <div
            style={{
              alignItems: "center",
              gap: "4px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "60px",
                fontWeight: 900,
                lineHeight: "1.05",
              }}
            >
              Knowledge Treasure
            </span>
            <span
              style={{
                color: "#007BFF",
                fontSize: "60px",
                fontWeight: 900,
                lineHeight: "1.05",
              }}
            >
              Trove
            </span>
            <span
              style={{
                color: "white",
                fontSize: "60px",
                fontWeight: 900,
                lineHeight: "1.05",
              }}
            >
              Open for Community
            </span>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            color: "#E2E8F0",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "28px",
            width: "100%",
          }}
        >
          Search, download and share thousands of academic, economic and
          technology
          <br />
          documents completely free.
        </div>

        <div
          style={{
            width: "672px",
            maxWidth: "672px",
            padding: "8px",
            background: "white",
            borderRadius: "16px",
            position: "relative",
            display: "flex",
            gap: "12px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              borderRadius: "16px",
            }}
          />

          <div
            style={{
              flex: 1,
              padding: "0 16px",
              borderRight: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ color: "#94A3B8" }}>
              <SearchIcon size={18} />
            </div>
            <div
              style={{
                flex: 1,
                padding: "14px 12px",
                color: "#6B7280",
                fontSize: "16px",
              }}
            >
              Enter document name, topic or keyword...
            </div>
          </div>

          <div
            style={{
              padding: "12px 32px",
              background: "#007BFF",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Search
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
        ></div>
      </div>
    </div>
  );
}