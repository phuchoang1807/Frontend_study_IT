// src/pages/home/Home.jsx

// XÓA các dòng cũ này:
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import Stats from "../components/Stats";
// ... bất kỳ import nào dùng ../

// CHỈ giữ lại (hoặc thêm mới) các import đúng:
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Stats from "../../components/Stats";
import Categories from "../../components/Categories";
import LatestDocuments from "../../components/LatestDocuments";
import ContributeSection from "../../components/ContributeSection";
import PopularDocuments from "../../components/PopularDocuments";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div
      style={{
        width: "1280px",
        height: "2715px",
        position: "relative",
        background: "#F5F7F8",
        margin: "0 auto",
      }}
    >
      <Header />

      <div
        style={{
          width: "1280px",
          padding: "32px",
          position: "absolute",
          left: 0,
          top: "65px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "48px",
          display: "inline-flex",
        }}
      >
        <Hero />
        <Stats />
        <Categories />
        <LatestDocuments />
        <ContributeSection />
        <PopularDocuments />
      </div>

      <Footer />
    </div>
  );
}