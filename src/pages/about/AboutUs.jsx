import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  DatabaseIcon,
  MonitorIcon,
  NetworkIcon,
  UsersIcon,
} from "../../components/icons";
import "../../styles/aboutUs.css";

const coreValues = [
  {
    title: "Learner-Centric",
    description:
      "Mọi nội dung, tính năng và trải nghiệm đều đặt hiệu quả học tập thực tế của người học lên trước.",
    icon: MonitorIcon,
  },
  {
    title: "Thực Tiễn Công Nghệ",
    description:
      "Chúng tôi cập nhật kiến thức IT sát với nhu cầu thị trường và công việc của doanh nghiệp.",
    icon: NetworkIcon,
  },
  {
    title: "Chất Lượng Học Thuật",
    description:
      "Nội dung được biên tập có hệ thống, rõ ràng, dễ áp dụng và được kiểm duyệt liên tục.",
    icon: DatabaseIcon,
  },
  {
    title: "Cộng Đồng Đồng Hành",
    description:
      "Xây dựng môi trường học tập chia sẻ, nơi mọi người cùng hỗ trợ và phát triển sự nghiệp IT.",
    icon: UsersIcon,
  },
];

export default function AboutUs() {
  return (
    <main className="about-us-page">
      {/* ==================== HERO SECTION ==================== */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-container">
          <div className="about-hero-content">
            <p className="about-eyebrow">STUDYIT EDTECH</p>
            <h1 id="about-hero-title">
              Kiến tạo thế hệ nhân lực IT<br />
              vững nền tảng, sẵn sàng cho tương lai số
            </h1>
            <p>
              Chúng tôi là công ty EdTech chuyên về giáo dục IT, tập trung vào nội dung 
              chất lượng cao, lộ trình học rõ ràng và trải nghiệm học tập hiện đại cho mọi cấp độ.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="about-section" aria-labelledby="mission-title">
        <div className="about-container">
          <div className="about-two-column">
            <article className="about-card mission-card">
              <h2 id="mission-title">Sứ mệnh</h2>
              <p>
                StudyIT giúp người học tiếp cận kiến thức công nghệ một cách hệ thống, dễ hiểu và có thể áp dụng ngay vào thực tế. 
                Chúng tôi thu hẹp khoảng cách giữa lý thuyết và nhu cầu doanh nghiệp thông qua tài liệu, khóa học và hệ sinh thái học tập tương tác.
              </p>
            </article>

            <article className="about-card vision-card">
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành nền tảng EdTech hàng đầu về giáo dục IT tại Việt Nam và khu vực, nơi mọi người có thể học tập suốt đời, 
                phát triển kỹ năng số bền vững và tạo tác động tích cực cho cộng đồng công nghệ.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== GIÁ TRỊ CỐT LÕI ==================== */}
      <section className="about-section core-values-section" aria-labelledby="core-values-title">
        <div className="about-container">
          <h2 id="core-values-title" className="section-title">Giá trị cốt lõi</h2>
          
          <div className="about-values-grid">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <article className="about-value-card" key={value.title}>
                  <span className="about-value-icon" aria-hidden="true">
                    <Icon size={28} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GIỚI THIỆU CÔNG TY & ĐỘI NGŨ ==================== */}
      <section className="about-section" aria-labelledby="company-title">
        <div className="about-container">
          <div className="about-company-card">
            <h2 id="company-title">Giới thiệu công ty và đội ngũ</h2>
            <p>
              Khởi đầu từ một nhóm chuyên gia giáo dục và kỹ sư phần mềm, StudyIT đã phát triển thành đội ngũ đa lĩnh vực gồm giảng viên, 
              kỹ sư, chuyên gia sản phẩm và cố vấn nghề nghiệp. Chúng tôi cùng theo đuổi một mục tiêu: mang giáo dục IT chất lượng đến gần hơn với cộng đồng người học Việt.
            </p>
            
            <ul className="about-highlights">
              <li>
                <CheckCircleIcon size={18} /> Đội ngũ kết hợp chuyên môn công nghệ và sư phạm hiện đại
              </li>
              <li>
                <CheckCircleIcon size={18} /> Tập trung vào lộ trình học và kỹ năng ứng dụng thực tế
              </li>
              <li>
                <CheckCircleIcon size={18} /> Đồng hành cùng người học từ nhập môn đến nâng cao
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="about-section cta-section" aria-labelledby="cta-title">
        <div className="about-container">
          <div className="about-cta">
            <h2 id="cta-title">Sẵn sàng bắt đầu hành trình IT cùng chúng tôi?</h2>
            <p>
              Khám phá tài liệu, tham gia cộng đồng học tập và nâng cấp kỹ năng của bạn ngay hôm nay.
            </p>
            <div className="about-cta-actions">
              <Link to="/documents" className="about-btn about-btn-primary">
                Khám phá tài liệu
              </Link>
              <Link to="/contributor-request" className="about-btn about-btn-secondary">
                Liên hệ hợp tác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}