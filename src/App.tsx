import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollTopButton from "./components/ScrollTopButton";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default App;
