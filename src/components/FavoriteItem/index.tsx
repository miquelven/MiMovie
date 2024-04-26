import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";

interface propType {
  data: {
    id: number;
    title: string;
    poster_path: string;
  };
  index: number;
}

export default function FavoriteItem({ data, index }: propType) {
  return (
    <GridItem
      mx="auto"
      p="20px"
      transition={"all ease 400ms"}
      background={index % 2 !== 0 ? "#1c212e" : ""}
      borderRadius={"12px"}
      _hover={{
        background: "#1c212e",
        cursor: "pointer",
      }}
    >
      <Link onClick={() => setCurrentMovie(data.id)} to={`/${data.title}`}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap="8px"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`Imagem do filme ${data.title}`}
            className="object-cover object-center rounded-md"
          />

          <Heading
            as="h4"
            fontSize={{ base: "sm", md: "large", xl: "2xl" }}
            textAlign={"center"}
          >
            {data.title}
          </Heading>
        </Flex>
      </Link>
    </GridItem>
  );
}
