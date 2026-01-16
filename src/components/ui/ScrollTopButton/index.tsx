import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

export default function ScrollTopButton() {
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
    <IconButton
      onClick={scrollTop}
      fontSize={{ base: "28px", sm: "36px" }}
      colorScheme="transparent"
      aria-label="Voltar ao topo"
      color="#fff9"
      position="fixed"
      bottom="32px"
      right={{ base: "12px", lg: "32px" }}
      style={{
        transition: "all ease 500ms",
        opacity: showScroll ? "1" : "0",
        zIndex: showScroll ? "10" : "-1",
      }}
      _hover={{ transform: "scale(1.1)" }}
      icon={<FaArrowCircleUp />}
    />
  );
}
