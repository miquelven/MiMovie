import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Hide,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import TopListMovieInfoItem from "./TopListMovieInfoItem";
import setCurrentMovie from "../../../helpers/setCurrentMovie";

interface currentItemProp {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

interface propType {
  isLoading: boolean;
}

export default function TopListMovieInfo({ isLoading }: propType) {
  const [currentItem] = useLocalStorage<currentItemProp | null>(
    "weekCurrentItem",
    null
  );

  const [gridItems] = useLocalStorage("weekItems", []);

  return (
    <Hide below="lg">
      <Flex flex="2" flexDir={"column"}>
        <>
          <Skeleton
            isLoaded={!isLoading}
            startColor="#2d323f"
            endColor="#131722"
            maxH="400px"
          >
            <Flex gap="40px" position={"relative"}>
              <img
                src={`https://image.tmdb.org/t/p/original${currentItem?.poster_path}`}
                alt={`Imagem do filme ${currentItem?.title}`}
                className="max-w-[200px] w-10/12 object-cover"
              />
              <Center>
                <Flex flexDir="column" gap="32px">
                  <Box>
                    <Text fontSize={"14px"} color="#fff8">
                      {currentItem?.release_date.split("-")[0]}
                    </Text>
                    <Heading as="h3" fontSize={{ md: "2xl", xl: "4xl" }}>
                      {currentItem?.title}
                    </Heading>
                  </Box>
                  <Text noOfLines={3} fontSize={{ md: "sm", xl: "medium" }}>
                    {currentItem?.overview}
                  </Text>
                  <Link
                    onClick={() => setCurrentMovie(currentItem!.id)}
                    to={`/${currentItem?.title.split(" ").join("-")}`}
                    className="text-sm md:text-sm xl:text-base text-[#23a7d7] hover:text-[#005282] hover:underline"
                  >
                    Ver Mais Informações
                  </Link>
                </Flex>
              </Center>
            </Flex>
            <Divider mt="24px" borderColor="#fff4" />
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            startColor="#2d323f"
            endColor="#131722"
            mt="40px"
            h="100%"
          >
            <Grid templateColumns={"repeat(2, 1fr)"} gap="40px">
              {gridItems.length > 0 &&
                gridItems.map(
                  (item, index) =>
                    index < 10 && (
                      <TopListMovieInfoItem data={item} key={index} />
                    )
                )}
            </Grid>
          </Skeleton>
        </>
      </Flex>
    </Hide>
  );
}
