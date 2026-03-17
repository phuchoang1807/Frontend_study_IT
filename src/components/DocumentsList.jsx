// src/pages/DocumentsList.jsx
import Header from "./Header";
import Footer from "./Footer";

export default function DocumentsList() {
  return (
    <div
      style={{
         width: "100%",
        minHeight: "100vh",
        background: "#F5F7F8",
        
      }}
    >
       <Header />
      {/* Main container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          paddingTop: "32px",
          paddingBottom: "32px",
          paddingLeft: "16px",
          paddingRight: "16px",
          boxSizing: "border-box",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "32px",
          display: "inline-flex",
        }}
      >
        {/* Sidebar - Bộ lọc tìm kiếm */}
        <div
          style={{
            width: "272px",
            height: "721px",
            paddingLeft: "11px",
            paddingRight: "11px",
            position: "relative",
            background: "white",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "inline-flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "10px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "24px",
              display: "flex",
            }}
          >
            {/* Tiêu đề Bộ lọc */}
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                display: "inline-flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "18px", height: "18px", background: "#007BFF" }}></div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "132.61px",
                    height: "28px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0F172A",
                    fontSize: "18px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    lineHeight: "28px",
                  }}
                >
                  Search Filters
                </div>
              </div>
            </div>

            {/* Lĩnh vực IT */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
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
                    color: "#94A3B8",
                    fontSize: "12px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: "16px",
                    letterSpacing: "0.60px",
                  }}
                >
                  IT Fields
                </div>
              </div>

              <div
                style={{
                  alignSelf: "stretch",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "4px",
                  display: "flex",
                }}
              >
                {/* Web Development - Đã chọn */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    background: "rgba(0, 123, 255, 0.10)",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "15px", height: "15px", background: "#007BFF" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "122.50px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#007BFF",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      Web Development
                    </div>
                  </div>
                </div>

                {/* Data Science */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "13.50px", height: "13.50px", background: "#94A3B8" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "88.17px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      Data Science
                    </div>
                  </div>
                </div>

                {/* AI / Machine Learning */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "14.26px", height: "15px", background: "#94A3B8" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "146.39px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      AI / Machine Learning
                    </div>
                  </div>
                </div>

                {/* Database */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "13.50px", height: "13.50px", background: "#94A3B8" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "63.34px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      Database
                    </div>
                  </div>
                </div>

                {/* DevOps */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "15px", height: "12px", background: "#94A3B8" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "53.05px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      DevOps
                    </div>
                  </div>
                </div>

                {/* Mobile Development */}
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    borderRadius: "8px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ width: "11.25px", height: "16.50px", background: "#94A3B8" }}></div>
                  </div>
                  <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div
                      style={{
                        width: "137.45px",
                        height: "20px",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      Mobile Development
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thẻ phổ biến */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
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
                    color: "#94A3B8",
                    fontSize: "12px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: "16px",
                    letterSpacing: "0.60px",
                  }}
                >
                  Popular Tags
                </div>
              </div>

              <div style={{ alignSelf: "stretch", height: "120px", position: "relative" }}>
                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: 0,
                    top: 0,
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "55.55px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Textbook
                  </div>
                </div>

                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "79.55px",
                    top: 0,
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "39.23px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Exercise
                  </div>
                </div>

                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "142.78px",
                    top: 0,
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "28.27px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Slide
                  </div>
                </div>

                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: 0,
                    top: "32px",
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "109px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Reference Material
                  </div>
                </div>

                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: 0,
                    top: "64px",
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "203.63px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Beginner / Intermediate / Advanced
                  </div>
                </div>

                <div
                  style={{
                    height: "24px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: 0,
                    top: "96px",
                    position: "absolute",
                    background: "#F1F5F9",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "105.20px",
                      height: "16px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "12px",
                      fontFamily: "Inter",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Java / React / SQL
                  </div>
                </div>
              </div>
            </div>

            {/* Sắp xếp theo */}
            <div
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "flex",
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
                    color: "#94A3B8",
                    fontSize: "12px",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: "16px",
                    letterSpacing: "0.60px",
                  }}
                >
                  Sort By
                </div>
              </div>

              <div
                style={{
                  alignSelf: "stretch",
                  height: "36px",
                  position: "relative",
                  background: "#F1F5F9",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "256px",
                    height: "36px",
                    paddingTop: "7.50px",
                    paddingBottom: "7.50px",
                    paddingLeft: "227px",
                    paddingRight: "8px",
                    left: 0,
                    top: 0,
                    position: "absolute",
                    overflow: "hidden",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ width: "21px", height: "21px", position: "relative", overflow: "hidden" }}>
                    <div
                      style={{
                        width: "8.40px",
                        height: "4.20px",
                        left: "6.30px",
                        top: "8.40px",
                        position: "absolute",
                        outline: "1.57px solid #6B7280",
                        outlineOffset: "-0.79px",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    width: "198px",
                    left: "12px",
                    top: "8px",
                    position: "absolute",
                    overflow: "hidden",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "57.33px",
                      height: "20px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "#0F172A",
                      fontSize: "14px",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    Newest
                  </div>
                </div>
              </div>
            </div>

            {/* Phổ biến / Mới nhất toggle */}
            <div
              style={{
                width: "256px",
                height: "75px",
                paddingTop: "4px",
                paddingBottom: "4px",
                left: "8px",
                top: "580px",
                position: "absolute",
                background: "white",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "256px",
                  height: "75px",
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "rgba(255,255,255,0)",
                  boxShadow: "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
                  borderRadius: "8px",
                }}
              ></div>

              <div
                style={{
                  alignSelf: "stretch",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
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
                    color: "#0F172A",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "20px",
                  }}
                >
                  Popular
                </div>
              </div>

              <div
                style={{
                  alignSelf: "stretch",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  background: "rgba(0, 123, 255, 0.10)",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "20px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#007BFF",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Newest
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Danh sách tài liệu */}
        <div style={{ flex: "1 1 0", alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "32px", display: "inline-flex" }}>
          {/* Breadcrumb */}
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "18px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "8px",
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                display: "inline-flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "66.73px",
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
                  Home
                </div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "4.32px", height: "7px", background: "#64748B" }}></div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div
                  style={{
                    width: "118.11px",
                    height: "20px",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    color: "#0F172A",
                    fontSize: "14px",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  Document List
                </div>
              </div>
            </div>

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
                  color: "#0F172A",
                  fontSize: "30px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "36px",
                }}
              >
                Document List
              </div>
            </div>

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
                  color: "#64748B",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Search and download more than 10,000 high-quality IT learning documents.
              </div>
            </div>
          </div>

          {/* Danh sách tài liệu (3 card mẫu) */}
          <div style={{ alignSelf: "stretch", height: "473px", position: "relative" }}>
            {/* Card 1 */}
            <div
              style={{
                width: "452px",
                left: 0,
                top: 0,
                position: "absolute",
                background: "white",
                overflow: "hidden",
                borderRadius: "12px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "160px",
                  alignSelf: "stretch",
                  position: "relative",
                  background: "#F1F5F9",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "32px", height: "40px", background: "rgba(0, 123, 255, 0.40)" }}></div>
                </div>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "8px",
                    top: "8px",
                    position: "absolute",
                    background: "#EF4444",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "19.58px",
                      height: "15px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      lineHeight: "15px",
                    }}
                  >
                    PDF
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 0",
                  alignSelf: "stretch",
                  padding: "20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingBottom: "16px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        background: "rgba(0, 123, 255, 0.10)",
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#007BFF",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 600,
                          lineHeight: "16px",
                        }}
                      >
                        Textbook
                      </div>
                    </div>

                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div
                        style={{
                          width: "65.16px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#94A3B8",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        12/05/2023
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "49.50px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "266px",
                        height: "50px",
                        left: 0,
                        top: 0,
                        position: "absolute",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "17px",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        lineHeight: "24.75px",
                      }}
                    >
                      Comprehensive Guide to Basic Computing, Networking
                    </div>
                  </div>

                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "inline-flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                    </div>
                    <div
                      style={{
                        width: "148.94px",
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
                      PGS.TS Nguyen Van A
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    alignSelf: "stretch",
                    paddingTop: "16px",
                    borderTop: "1px solid #F1F5F9",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "12.83px", height: "8.75px", background: "#64748B" }}></div>
                      </div>
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
                            width: "22.73px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          1.2k
                        </div>
                      </div>
                    </div>

                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                      </div>
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
                            width: "22.86px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          450
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "8px", borderRadius: "8px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                      <div style={{ width: "16px", height: "16px", background: "#007BFF" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                width: "452px",
                left: "492px",
                top: 0,
                position: "absolute",
                background: "white",
                overflow: "hidden",
                borderRadius: "12px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "160px",
                  alignSelf: "stretch",
                  position: "relative",
                  background: "#F1F5F9",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "36px", height: "36px", background: "rgba(96, 165, 250, 0.40)" }}></div>
                </div>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "8px",
                    top: "8px",
                    position: "absolute",
                    background: "#3B82F6",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "29.56px",
                      height: "15px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      lineHeight: "15px",
                    }}
                  >
                    DOCX
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 0",
                  alignSelf: "stretch",
                  padding: "20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingBottom: "16px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        background: "rgba(16, 185, 129, 0.10)",
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "39.59px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#10B981",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 600,
                          lineHeight: "16px",
                        }}
                      >
                        Exercise
                      </div>
                    </div>

                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div
                        style={{
                          width: "67.95px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#94A3B8",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        08/05/2023
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "49.50px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "266px",
                        height: "50px",
                        left: 0,
                        top: 0,
                        position: "absolute",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "17px",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        lineHeight: "24.75px",
                      }}
                    >
                      CIS Review: Web Development, SEO, and ...
                    </div>
                  </div>

                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "inline-flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                    </div>
                    <div
                      style={{
                        width: "112.92px",
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
                      Specialized Committee
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    alignSelf: "stretch",
                    paddingTop: "16px",
                    borderTop: "1px solid #F1F5F9",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "12.83px", height: "8.75px", background: "#64748B" }}></div>
                      </div>
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
                            width: "24.72px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          3.5k
                        </div>
                      </div>
                    </div>

                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                      </div>
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
                            width: "26px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          2.1k
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "8px", borderRadius: "8px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                      <div style={{ width: "16px", height: "16px", background: "#007BFF" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                width: "452px",
                left: 0,
                top: "248.50px",
                position: "absolute",
                background: "white",
                overflow: "hidden",
                borderRadius: "12px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "160px",
                  alignSelf: "stretch",
                  position: "relative",
                  background: "#F1F5F9",
                }}
              >
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "8px",
                    top: "8px",
                    position: "absolute",
                    background: "#F59E0B",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "27.03px",
                      height: "15px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      lineHeight: "15px",
                    }}
                  >
                    PPTX
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 0",
                  alignSelf: "stretch",
                  padding: "20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingBottom: "16px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        background: "rgba(217, 119, 6, 0.10)",
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "33.59px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#D97706",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 600,
                          lineHeight: "16px",
                        }}
                      >
                        Project
                      </div>
                    </div>

                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div
                        style={{
                          width: "68.03px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#94A3B8",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        25/04/2023
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "49.50px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "266px",
                        height: "49px",
                        left: 0,
                        top: "0.50px",
                        position: "absolute",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "17px",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        lineHeight: "24.75px",
                      }}
                    >
                      Comprehensive Study of Animal Biology & ...
                    </div>
                  </div>

                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "inline-flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                    </div>
                    <div
                      style={{
                        width: "121px",
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
                      Tran Binh
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    alignSelf: "stretch",
                    paddingTop: "16px",
                    borderTop: "1px solid #F1F5F9",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "12.83px", height: "8.75px", background: "#64748B" }}></div>
                      </div>
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
                            width: "22.36px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          856
                        </div>
                      </div>
                    </div>

                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "3.99px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                      </div>
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
                            width: "20.06px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          124
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "8px", borderRadius: "8px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                      <div style={{ width: "16px", height: "16px", background: "#007BFF" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              style={{
                width: "452px",
                left: "492px",
                top: "248.50px",
                position: "absolute",
                background: "white",
                overflow: "hidden",
                borderRadius: "12px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  width: "160px",
                  alignSelf: "stretch",
                  position: "relative",
                  background: "#F1F5F9",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                  <div style={{ width: "32px", height: "40px", background: "rgba(0, 123, 255, 0.40)" }}></div>
                </div>
                <div
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    left: "8px",
                    top: "8px",
                    position: "absolute",
                    background: "#EF4444",
                    borderRadius: "4px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      width: "19.58px",
                      height: "15px",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      lineHeight: "15px",
                    }}
                  >
                    PDF
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 0",
                  alignSelf: "stretch",
                  padding: "20px",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    alignSelf: "stretch",
                    paddingBottom: "16px",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "8px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        background: "rgba(0, 123, 255, 0.10)",
                        borderRadius: "4px",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{
                          width: "56.27px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#007BFF",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 600,
                          lineHeight: "16px",
                        }}
                      >
                        Textbook
                      </div>
                    </div>

                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div
                        style={{
                          width: "65.59px",
                          height: "16px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                          color: "#94A3B8",
                          fontSize: "12px",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          lineHeight: "16px",
                        }}
                      >
                        15/04/2023
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      alignSelf: "stretch",
                      height: "49.50px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "266px",
                        height: "49px",
                        left: 0,
                        top: "0.50px",
                        position: "absolute",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        color: "#0F172A",
                        fontSize: "17px",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        lineHeight: "24.75px",
                      }}
                    >
                      Comprehensive Guide on Division of Labour and ...
                    </div>
                  </div>

                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "inline-flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                      <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                    </div>
                    <div
                      style={{
                        width: "100.34px",
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
                      M Cuong
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    alignSelf: "stretch",
                    paddingTop: "16px",
                    borderTop: "1px solid #F1F5F9",
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                >
                  <div style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "12.83px", height: "8.75px", background: "#64748B" }}></div>
                      </div>
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
                            width: "24.69px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          5.2k
                        </div>
                      </div>
                    </div>

                    <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "4px", display: "flex" }}>
                      <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                        <div style={{ width: "9.33px", height: "9.33px", background: "#64748B" }}></div>
                      </div>
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
                            width: "25.48px",
                            height: "16px",
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                            color: "#64748B",
                            fontSize: "12px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            lineHeight: "16px",
                          }}
                        >
                          3.4k
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "8px", borderRadius: "8px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                    <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                      <div style={{ width: "16px", height: "16px", background: "#007BFF" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phân trang */}
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: "16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                <div style={{ width: "7.40px", height: "12px", background: "#0F172A" }}></div>
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#007BFF",
                borderRadius: "8px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "6.91px",
                  height: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                  lineHeight: "24px",
                }}
              >
                1
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "9.77px",
                  height: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#0F172A",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                2
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "9.89px",
                  height: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#0F172A",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                3
              </div>
            </div>

            <div style={{ paddingLeft: "8px", paddingRight: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
              <div
                style={{
                  width: "13.83px",
                  height: "24px",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#94A3B8",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                ...
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "16.27px",
                  height: "24px",
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "#0F172A",
                  fontSize: "16px",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                12
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                outline: "1px solid #E2E8F0",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", display: "inline-flex" }}>
                <div style={{ width: "7.40px", height: "12px", background: "#0F172A" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer chung (dùng component Footer đã có) */}
      {/* <Footer />  // Nếu bạn muốn footer ở đây thì uncomment */}
      <Footer />
    </div>
  );
}