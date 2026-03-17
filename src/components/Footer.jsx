// src/components/Footer.jsx
import { FacebookIcon, GlobeIcon, LanguageIcon, LinkedinIcon, UsersIcon, YoutubeIcon } from "./icons";
export default function Footer() {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "64px",
        paddingBottom: "32px",
        marginTop: "80px",
        background: "white",
        borderTop: "1px solid #E2E8F0",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
      }}
    >
      <img
        style={{
          width: "172.45px",
          height: "32px",
          margin: "0 auto",
          display: "block",
        }}
        src="/StudyIT.jpg"
        alt="StudyIT Logo"
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          paddingLeft: "32px",
          paddingRight: "32px",
          margin: "0 auto",
          boxSizing: "border-box",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "48px",
          display: "flex",
        }}
      >
        <div
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "48px",
            display: "inline-flex",
          }}
        >
          {/* Cột 1 - About */}
          <div
            style={{
              width: "457.59px",
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "inline-flex",
            }}
          >
            <div style={{ alignSelf: "stretch", height: "28px" }}></div>

            <div
              style={{
                width: "384px",
                maxWidth: "384px",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "368.95px",
                  height: "52px",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#64748B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "26px",
                }}
              >
                Leading IT learning document sharing and management platform<br />
                for the Vietnamese developer community.
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "16px",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#F1F5F9",
                  borderRadius: "9999px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ color: "#475569" }}><FacebookIcon size={17} /></div>
                </div>
              </div>

              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#F1F5F9",
                  borderRadius: "9999px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ color: "#475569" }}><UsersIcon size={17} /></div>
                </div>
              </div>

              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#F1F5F9",
                  borderRadius: "9999px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ color: "#475569" }}><LinkedinIcon size={14} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2 - About Us */}
          <div
            style={{
              width: "204.80px",
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#1E293B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                About Us
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "16px",
                display: "flex",
              }}
            >
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Introduction
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Terms of Service
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Privacy Policy
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Contact
              </div>
            </div>
          </div>

          {/* Cột 3 - Resources */}
          <div
            style={{
              width: "204.80px",
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#1E293B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                Resources
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "16px",
                display: "flex",
              }}
            >
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Learning Materials
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Video Courses
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                In-depth Articles
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Roadmaps
              </div>
            </div>
          </div>

          {/* Cột 4 - Support */}
          <div
            style={{
              width: "204.81px",
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#1E293B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                Support
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "16px",
                display: "flex",
              }}
            >
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Help Center
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Usage Guide
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                Report Bug
              </div>
              <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#64748B", fontSize: "14px", fontWeight: 500, lineHeight: "20px" }}>
                FAQ
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            alignSelf: "stretch",
            paddingTop: "32px",
            borderTop: "1px solid #E2E8F0",
            justifyContent: "space-between",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                width: "408.05px",
                height: "20px",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "#64748B",
                fontSize: "14px",
                fontFamily: "Inter",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              © 2026 StudyIT. All rights reserved.
            </div>
          </div>

          <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex" }}>
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ color: "#94A3B8" }}><LanguageIcon size={12} /></div>
              </div>
              <div
                style={{
                  width: "89px",
                  height: "20px",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#94A3B8",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                English
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "4px",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ color: "#94A3B8" }}><GlobeIcon size={12} /></div>
              </div>
              <div
                style={{
                  width: "61.20px",
                  height: "20px",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#94A3B8",
                  fontSize: "14px",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                Global
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}