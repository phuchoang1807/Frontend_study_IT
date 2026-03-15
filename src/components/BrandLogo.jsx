import logoMark from "/favicon.svg";

export default function BrandLogo() {
  return (
    <div className="brand-logo" aria-label="StudyIT logo">
      <img src={logoMark} alt="StudyIT" className="brand-logo__mark" />
      <span className="brand-logo__text">StudyIT</span>
    </div>
  );
}