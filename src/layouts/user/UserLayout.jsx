import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import JustChatWidget from "../../components/common/JustChatWidget";

export default function UserLayout() {
  return (
    <>
      <JustChatWidget />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
