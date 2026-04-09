import { GiftIcon, ShieldIcon } from "./icons";
import bannerHome from "../assets/BannerHome.jpg";
export default function ContributeSection() {
  return (
    <div
      style={{
        alignSelf: "stretch",
        padding: "32px",
        background: "rgba(0, 123, 255, 0.05)",
        borderRadius: "24px",
        outline: "1px solid rgba(0, 123, 255, 0.10)",
        outlineOffset: "-1px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
      }}
    >
      <div style={{ alignSelf: "stretch", justifyContent: "center", alignItems: "center", gap: "48px", display: "inline-flex" }}>
        <div style={{ flex: "1 1 0", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "inline-flex" }}>
          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
            <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "30px", fontWeight: 900, lineHeight: "36px" }}>
              Bạn có tài liệu nào muốn chia sẻ không?
            </div>
          </div>

          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "flex" }}>
            <div style={{ alignSelf: "stretch", justifyContent: "center", display: "flex", flexDirection: "column", color: "#475569", fontSize: "16px", fontWeight: 400, lineHeight: "26px" }}>
              Tham gia cộng đồng StudyIT bằng cách chia sẻ kiến thức giá trị của bạn.<br />Mỗi tài liệu bạn chia sẻ sẽ giúp hàng ngàn học sinh, sinh viên và người học trên khắp Việt Nam.
            </div>
          </div>

          <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "inline-flex" }}>
            <div
              style={{
                alignSelf: "stretch",
                padding: "8px 16px",
                background: "white",
                borderRadius: "12px",
                outline: "1px solid #F1F5F9",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ color: "#007BFF" }}><ShieldIcon size={22} /></div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "158.56px", height: "20px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                  Được bảo vệ bản quyền
                </div>
              </div>
            </div>

            <div
              style={{
                alignSelf: "stretch",
                padding: "8px 16px",
                background: "white",
                borderRadius: "12px",
                outline: "1px solid #F1F5F9",
                outlineOffset: "-1px",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "7.99px",
                display: "flex",
              }}
            >
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ color: "#007BFF" }}><GiftIcon size={20} /></div>
              </div>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                <div style={{ width: "173px", height: "30px", justifyContent: "center", display: "flex", flexDirection: "column", color: "#0F172A", fontSize: "14px", fontWeight: 600, lineHeight: "20px" }}>
                  Nhận thưởng khi đóng góp
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "16px 40px",
              position: "relative",
              background: "#007BFF",
              borderRadius: "16px",
              justifyContent: "center",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                width: "253.66px",
                height: "56px",
                left: 0,
                top: 0,
                position: "absolute",
                background: "rgba(255,255,255,0)",
                boxShadow: "0px 8px 10px -6px rgba(0,123,255,0.20), 0px 20px 25px -5px rgba(0,123,255,0.20)",
                borderRadius: "16px",
              }}
            ></div>
            <div style={{ width: "173.66px", height: "24px", textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column", color: "white", fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}>
              Đóng góp tài liệu ngay
            </div>
          </div>
        </div>

        <div style={{ flex: "1 1 0", position: "relative", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
          <img style={{ width: "525px", height: "296px", objectFit: "cover" }} src={bannerHome} alt="Contribute Illustration" />

          <div
            style={{
              width: "96px",
              height: "96px",
              left: "471px",
              top: "-16px",
              position: "absolute",
              background: "rgba(0,123,255,0.20)",
              boxShadow: "40px 40px 40px",
              borderRadius: "9999px",
              filter: "blur(20px)",
            }}
          ></div>

          <div
            style={{
              width: "128px",
              height: "128px",
              left: "-24px",
              top: "192px",
              position: "absolute",
              background: "rgba(168,85,247,0.10)",
              boxShadow: "40px 40px 40px",
              borderRadius: "9999px",
              filter: "blur(20px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}