import heroImage from "../assets/hero.png";
export default function Background() {
  return (
      <div className="brand-showcase">
      <img src={heroImage} alt="StudyIT illustration" className="brand-showcase__image" />
      <h2 className="brand-showcase__title">Master Your Craft</h2>
      <p className="brand-showcase__description">
        Access thousands of curated documentation, connect with fellow developers,
        and streamline your learning journey.
      </p>
        </div>
  );
}