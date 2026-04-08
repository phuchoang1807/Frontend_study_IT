import heroImage from "../assets/hero.png";
export default function Background() {
  return (
      <div className="brand-showcase">
      <img src={heroImage} alt="StudyIT illustration" className="brand-showcase__image" />
      <h2 className="brand-showcase__title">Làm chủ kỹ năng của bạn</h2>
      <p className="brand-showcase__description">
        Truy cập hàng nghìn tài liệu được chọn lọc, kết nối với các lập trình viên khác và tối ưu hóa hành trình học tập của bạn.
      </p>
        </div>
  );
}