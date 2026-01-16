import { Box, Flex, Heading, Slide } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";
import { useState } from "react";
import { motion } from "framer-motion";
import TmdbImage from "../ui/TmdbImage";

interface propType {
  data: {
    id: number;
    title: string;
    backdrop_path: string;
  };
}

const MotionBox = motion(Box);

export default function WatchLaterItem({ data }: propType) {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <MotionBox
      layout
      borderRadius={"8px"}
      height={{ base: "200px", lg: "400px" }}
      position={"relative"}
      overflow="hidden"
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <TmdbImage
        path={data.backdrop_path}
        type="backdrop"
        alt={`Imagem de ${data.title}`}
        position="absolute"
        inset="0"
        w="full"
        h="full"
        objectFit="cover"
        zIndex={0}
      />
      <Link onClick={() => setCurrentMovie(data.id)} to={`/${data.title}`}>
        <Flex
          position={"absolute"}
          zIndex={10}
          inset={0}
          p="5%"
          flexDir="column"
          justifyContent={"space-between"}
          background={"#0001"}
          transition={"all ease 300ms"}
          _hover={{ background: "#0008" }}
          cursor="pointer"
          overflow={"hidden"}
        >
          <Slide
            direction="bottom"
            in={showTitle}
            style={{ zIndex: 10, position: "absolute", padding: "8px" }}
          >
            <Heading as="h3" fontSize={{ base: "large", md: "xl", xl: "2xl" }}>
              {data.title}
            </Heading>
          </Slide>
        </Flex>
      </Link>
    </MotionBox>
  );
}
