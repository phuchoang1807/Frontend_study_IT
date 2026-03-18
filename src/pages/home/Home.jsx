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
        width: "100%",
        minHeight: "100vh",
        background: "#F5F7F8",
       
      }}
    >
      <Header />

      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          padding: "32px",
          margin: "0 auto",
          paddingTop: "24px",
          boxSizing: "border-box",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "48px",
          display: "flex",
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