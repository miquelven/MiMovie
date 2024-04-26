import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";

interface propType {
  data: {
    id: number;
    title: string;
    backdrop_path: string;
  };
}

export default function WatchLaterItem({ data }: propType) {
  return (
    <Box
      background={`url(https://image.tmdb.org/t/p/original${data.backdrop_path})`}
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={{ base: "200px", lg: "400px" }}
      position={"relative"}
    >
      {/* <div className="absolute bg-black/50 inset-0"></div> */}
      <Flex
        position={"absolute"}
        zIndex={10}
        inset={0}
        p="5%"
        flexDir="column"
        justifyContent={"space-between"}
        background={"#0007"}
        transition={"all ease 300ms"}
        _hover={{ background: "#0004" }}
      >
        <Heading as="h3" fontSize={{ base: "large", md: "xl", xl: "2xl" }}>
          {data.title}
        </Heading>
        <Link onClick={() => setCurrentMovie(data.id)} to={`/${data.title}`}>
          <Text
            fontSize={{ base: "12px", md: "16px" }}
            _hover={{ textDecor: "underline", color: "#ccc" }}
            textAlign={"center"}
          >
            Ver Informações
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
