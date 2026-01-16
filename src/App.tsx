import { useOutlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollTopButton from "./components/ui/ScrollTopButton";

function App() {
  const outlet = useOutlet();

  return (
    <>
      <ScrollToTop />
      <Header />
      {outlet}
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default App;
