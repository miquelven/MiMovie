import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";

interface dataType {
  data: {
    poster_path: string;
    title: string;
    release_date: string;
  };
}

export default function CardMovie({ data }: dataType) {
  return (
    <GridItem>
      <Box>
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            width="80%"
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`Imagem do filme ${data.title}`}
          />
          <Heading
            as="h6"
            fontSize={{ base: "medium", lg: "lg" }}
            mt="12px"
            mb="8px"
          >
            {data.title}
          </Heading>
          <Text fontSize={{ base: "xs", lg: "sm" }} color="#fff9">
            {data.release_date.split("-")[0]}
          </Text>
        </Flex>
      </Box>
    </GridItem>
  );
}
