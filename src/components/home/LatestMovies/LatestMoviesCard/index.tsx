import { AspectRatio, Flex, Heading, Slide } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import setCurrentMovie from "../../../../helpers/setCurrentMovie";
import TmdbImage from "../../../ui/TmdbImage";

interface typeProp {
  data: {
    id: number;
    backdrop_path: string;
    title: string;
  };
}

const MotionAspectRatio = motion(AspectRatio);

export default function LatestMoviesCard({
  data: { backdrop_path, title, id },
}: typeProp) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentMovie(id);
    navigate(`/${title}`);
  };

  return (
    <MotionAspectRatio
      className="h-[300px] relative z-10 cursor-pointer"
      ratio={4 / 3}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.03 }}
      onClick={handleClick}
    >
      <>
        <TmdbImage
          path={backdrop_path}
          type="backdrop"
          alt={`Imagem do filme ${title}`}
          objectFit="cover"
        />
        <div
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          onFocus={() => setShowDetails(true)}
          onBlur={() => setShowDetails(false)}
          className="transition-all duration-300 absolute inset-0 bg-black/30 hover:bg-black/60 "
        >
          <Slide
            direction="bottom"
            in={showDetails}
            style={{ zIndex: 10, position: "absolute", padding: "8px" }}
          >
            <Flex
              flexDir="column"
              justifyContent={"center"}
              alignItems="center"
              gap="8px"
            >
              <Heading as="h4" fontSize={"22px"}>
                {title}
              </Heading>
            </Flex>
          </Slide>
        </div>
      </>
    </MotionAspectRatio>
  );
}
