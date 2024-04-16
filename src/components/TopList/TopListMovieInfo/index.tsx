import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import TopListMovieInfoItem from "./TopListMovieInfoItem";

interface currentItemProp {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export default function TopListMovieInfo() {
  const [currentItem] = useLocalStorage<currentItemProp | null>(
    "weekCurrentItem",
    null
  );
  const [gridItems] = useLocalStorage("weekItems", []);

  return (
    <Flex flex="2" flexDir={"column"}>
      {currentItem && (
        <>
          <Flex gap="40px" position={"relative"} maxH="400px">
            <img
              src={`https://image.tmdb.org/t/p/original${currentItem.poster_path}`}
              alt={`Imagem do filme ${currentItem.title}`}
              className="max-w-[200px] w-10/12 object-cover"
            />
            <Center>
              <Flex flexDir="column" gap="32px">
                <Box>
                  <Text fontSize={"14px"} color="#fff8">
                    {currentItem.release_date.split("-")[0]}
                  </Text>
                  <Heading as="h3">{currentItem.title}</Heading>
                </Box>
                <Text>{currentItem.overview}</Text>
                <Link
                  to={`#`}
                  className="text-sm sm:text-base text-[#fff8] hover:text-[#eee] hover:underline"
                >
                  Ver Mais Informações
                </Link>
              </Flex>
            </Center>
          </Flex>
          <Divider mt="24px" borderColor="#fff4" />
          <Grid
            mt="40px"
            h="100%"
            templateColumns={"repeat(2, 1fr)"}
            gap="40px"
          >
            {gridItems.length > 0 &&
              gridItems.map(
                (item, index) =>
                  index < 10 && <TopListMovieInfoItem data={item} key={index} />
              )}
          </Grid>
        </>
      )}
    </Flex>
  );
}
