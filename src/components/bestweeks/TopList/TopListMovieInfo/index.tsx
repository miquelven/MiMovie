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
import setCurrentMovie from "../../../../helpers/setCurrentMovie";
import TmdbImage from "../../../ui/TmdbImage";

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
              <TmdbImage
                path={currentItem?.poster_path || ""}
                type="poster"
                alt={`Imagem do filme ${currentItem?.title}`}
                className="max-w-[200px] w-10/12 object-cover"
                sizes="200px"
              />
              <Center>
                <Flex flexDir="column" gap="32px">
                  <Box>
                    <Text fontSize={"14px"} color="#fff8">
                      {currentItem?.release_date.split("-")[0]}
                    </Text>
                    <Heading as="h2" fontSize={{ md: "2xl", xl: "4xl" }}>
                      {currentItem?.title}
                    </Heading>
                  </Box>
                  <Text noOfLines={3} fontSize={{ md: "sm", xl: "medium" }}>
                    {currentItem?.overview}
                  </Text>
                  <Link
                    onClick={() => setCurrentMovie(currentItem!.id)}
                    to={`/${currentItem?.title.split(" ").join("-")}`}
                  >
                    <Box
                      as="button"
                      px={{ base: 7, md: 8 }}
                      py={{ base: 2.5, md: 3 }}
                      borderRadius="full"
                      bg="rgba(10, 13, 20, 0.9)"
                      borderWidth="1px"
                      borderColor="#23a7d733"
                      fontWeight="semibold"
                      fontSize={{ base: "xs", md: "sm" }}
                      letterSpacing="0.06em"
                      textTransform="uppercase"
                      transition="all 0.2s ease"
                      color="#e5e7eb"
                      boxShadow="0 18px 45px rgba(5, 5, 9, 0.9)"
                      backdropFilter="blur(10px)"
                      _hover={{
                        color: "#0a0d14",
                        bg: "#1f9bc9",
                        borderColor: "#38bdf8",
                        transform: "translateY(-2px)",
                      }}
                      _active={{
                        bg: "#1a88b0",
                        borderColor: "#23a7d7",
                        transform: "translateY(0)",
                      }}
                    >
                      Ver Mais Informações
                    </Box>
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
