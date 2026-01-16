import { AspectRatio, Flex, Heading, Image, Slide } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import setCurrentMovie from "../../../../helpers/setCurrentMovie";

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

  return (
    <MotionAspectRatio
      className="h-[300px] relative z-10"
      ratio={4 / 3}
      initial={{ opacity: 0, scale: 0.97, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <>
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt="naruto"
          objectFit="cover"
        />
        <div
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
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
              <Link
                onClick={() => setCurrentMovie(id)}
                to={`/${title}`}
                className="text-sm font-medium text-[#23a7d7]  hover:underline"
              >
                Ver Mais Informações
              </Link>
            </Flex>
          </Slide>
        </div>
      </>
    </MotionAspectRatio>
  );
}
