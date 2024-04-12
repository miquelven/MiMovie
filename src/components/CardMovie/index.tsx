import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface dataType {
  data: {
    poster_path: string;
    title: string;
    release_date: string;
  };
  isLoading: boolean;
}

export default function CardMovie({ data, isLoading }: dataType) {
  return (
    <GridItem>
      {!isLoading ? (
        <Link to={`/${data.title.split(" ").join("-")}`}>
          <Box>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div className="w-full min-h-[336px]">
                <img
                  width="80%"
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  alt={`Imagem do filme ${data.title}`}
                />
              </div>
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
          </Box>
        </Link>
      ) : (
        <motion.div
          animate={{
            scale: [1, 0.95, 0.95, 0.95, 1],
            opacity: [1, 0.5, 0, 0.5, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
        >
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            color="#fff9"
          >
            <div className="w-10/12 min-h-[336px] bg-gray-800"></div>
            <Text
              fontSize={{ base: "medium", lg: "lg" }}
              mt="12px"
              mb="8px"
              textAlign={"center"}
            >
              -----------
            </Text>
            <Text fontSize={{ base: "xs", lg: "sm" }} color="#fff9">
              ------
            </Text>
          </Flex>
        </motion.div>
      )}
    </GridItem>
  );
}
