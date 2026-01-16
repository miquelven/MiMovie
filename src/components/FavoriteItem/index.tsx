import { Flex, GridItem, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import setCurrentMovie from "../../helpers/setCurrentMovie";
import TmdbImage from "../ui/TmdbImage";

interface propType {
  data: {
    id: number;
    title: string;
    poster_path: string;
  };
  index: number;
}

const MotionGridItem = motion(GridItem);

export default function FavoriteItem({ data, index }: propType) {
  return (
    <MotionGridItem
      layout
      mx="auto"
      p="20px"
      background={index % 2 !== 0 ? "#1c212e" : ""}
      borderRadius={"12px"}
      _hover={{
        background: "#1c212e",
        cursor: "pointer",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.04 }}
    >
      <Link onClick={() => setCurrentMovie(data.id)} to={`/${data.title}`}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          gap="8px"
        >
          <TmdbImage
            path={data.poster_path}
            type="poster"
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
    </MotionGridItem>
  );
}
