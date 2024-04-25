import { Box, Center, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";

interface dataType {
  data: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
  };
}

export default function CardMovie({ data }: dataType) {
  return (
    <GridItem _hover={{ background: "#1c212e" }} minHeight={"230px"}>
      <Link
        onClick={() => setCurrentMovie(data?.id)}
        to={`/${data?.title.split(" ").join("-")}`}
      >
        <Center>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            w={"80%"}
          >
            <Box
              bg="#0a0d14"
              minW={"100px"}
              w={"100%"}
              minH={"190px"}
              maxH={"350px"}
            >
              <img
                width="100%"
                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                alt={`Imagem do filme ${data.title}`}
                className="mx-auto "
              />
            </Box>
            <Heading
              as="h6"
              fontSize={{ base: "medium", lg: "lg" }}
              mt="12px"
              mb="8px"
              textAlign={"center"}
            >
              {data.title}
            </Heading>
            <Text fontSize={{ base: "xs", lg: "sm" }} color="#fff9">
              {data.release_date.split("-")[0]}
            </Text>
          </Flex>
        </Center>
      </Link>
    </GridItem>
  );
}
