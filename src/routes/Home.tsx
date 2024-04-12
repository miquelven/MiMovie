// import Banner from "../components/Banner/index.tsx";
// import LatestMovies from "../components/LatestMovies/index.tsx";
// import VideosArea from "../components/VideosArea/index.tsx";
import FeaturesArea from "../components/FeaturesArea/index.tsx";
import PopularMovies from "../components/PopularMovies/index.tsx";
import { IconButton } from "@chakra-ui/react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 800) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 800) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative">
      {/* <Banner />
      <VideosArea />
      <LatestMovies /> */}
      <FeaturesArea />
      <PopularMovies />

      <IconButton
        onClick={scrollTop}
        fontSize={{ base: "28px", sm: "36px" }}
        colorScheme="transparent"
        aria-label="To Top"
        color="#fff9"
        position="fixed"
        bottom="32px"
        right={{ base: "12px", lg: "32px" }}
        style={{
          transition: "all ease 500ms",
          opacity: showScroll ? "1" : "0",
          zIndex: showScroll ? "20" : "-1",
        }}
        icon={<FaArrowCircleUp />}
      />
    </main>
  );
}
