import { Box, Flex, Heading, Slide } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";
import { useState } from "react";

interface propType {
  data: {
    id: number;
    title: string;
    backdrop_path: string;
  };
}

export default function WatchLaterItem({ data }: propType) {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <Box
      background={`url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      borderRadius={"8px"}
      height={{ base: "200px", lg: "400px" }}
      position={"relative"}
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
    >
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
    </Box>
  );
}
