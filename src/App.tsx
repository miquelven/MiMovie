import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollTopButton from "./components/ui/ScrollTopButton";

function App() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          style={{ minHeight: "100vh" }}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.96 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
      <ScrollTopButton />
      <PwaInstallBanner />
      <Footer />
    </>
  );
}

export default App;
