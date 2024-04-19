import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { FaExternalLinkAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";

interface companieProp {
  logo_path: string;
  name: string;
}

interface genreProp {
  name: string;
}

interface propType {
  data?: {
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    genres: genreProp[];
    runtime: number;
    homepage: string;
    vote_average: number;
    production_companies: companieProp[];
  };
  isLoading: boolean;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function BannerVideoDetails({ data, isLoading }: propType) {
  return (
    <>
      <Box
        background={
          isLoading
            ? `#2d323f`
            : `url(https://image.tmdb.org/t/p/original${
                data!["backdrop_path"]
              })`
        }
        backgroundPosition={["left", null, "center"]}
        backgroundRepeat="no-repeat"
        position={"relative"}
        backgroundSize="cover"
        height="70vh"
        width={"full"}
      >
        <div className="absolute inset-0 bg-black/80 z-10 "></div>
        <Box position={"relative"} zIndex={20}></Box>
        <Box
          h="100%"
          w="100%"
          position={"absolute"}
          zIndex={10}
          left={"10%"}
          mt="15%"
          maxW="1580px"
          px={{ base: "30px", md: "10px" }}
        >
          <Flex h="80%" gap="80px">
            <Skeleton
              w={500}
              isLoaded={!isLoading}
              startColor="#2d323f"
              endColor="#131722"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt={`Imagem da capa do filme ${data?.title}`}
                className="h-full"
              />
            </Skeleton>
            <Flex flexDir="column" justifyContent={"space-between"} w="full">
              <Flex gap="20px" flexDir="column">
                <span className="text-2xl font-bold text-[#fffd]">
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    width={"10%"}
                    height={isLoading ? 30 : ""}
                  >
                    {data?.release_date.split("-")[0]}
                  </Skeleton>
                </span>
                <Heading as="h1" fontSize={"6xl"}>
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    height={isLoading ? 50 : ""}
                  >
                    {data?.title}
                  </Skeleton>
                </Heading>
                <Text fontSize={"large"} lineHeight={"34px"} color="#fffd">
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    height={isLoading ? "120px" : ""}
                    width={isLoading ? "80%" : ""}
                  >
                    {data?.overview}
                  </Skeleton>
                </Text>
                <Box mt="20px">
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    width={isLoading ? "40%" : ""}
                    height={isLoading ? 10 : ""}
                  >
                    <UnorderedList
                      style={{ display: "flex", gap: "40px", margin: "0" }}
                      color="#fffd"
                    >
                      <ListItem style={{ listStyle: "none" }}>
                        {data?.runtime && (
                          <>
                            <span>{Math.floor(data.runtime / 60)}h </span>
                            <span>{data.runtime % 60}min</span>
                          </>
                        )}
                      </ListItem>
                      <ListItem>
                        <span>{Number(data?.release_date.split("-")[2])} </span>

                        <span>
                          de {months[Number(data?.release_date.split("-")[1])]}
                        </span>
                        <span> de {data?.release_date.split("-")[0]}</span>
                      </ListItem>
                      <ListItem>
                        {data?.genres.map((genre, index) => (
                          <span key={index}>
                            {genre.name}
                            {index < data?.genres.length - 1 && ", "}
                          </span>
                        ))}
                      </ListItem>
                    </UnorderedList>
                  </Skeleton>
                </Box>
              </Flex>
              <Box h="20%">
                <Skeleton
                  isLoaded={!isLoading}
                  startColor="#2d323f"
                  endColor="#131722"
                  width={isLoading ? "100%" : ""}
                  height={isLoading ? 50 : ""}
                >
                  <Flex
                    alignItems="center"
                    justifyContent={"space-between"}
                    h="100%"
                    fontSize="xl"
                    fontWeight={"bold"}
                    color="#fffd"
                  >
                    {data?.homepage && (
                      <a href={data?.homepage} target="_blank">
                        <Flex
                          alignItems={"center"}
                          gap="16px"
                          color="#23a7d7"
                          _hover={{ textDecor: "underline" }}
                        >
                          <span>Assistir o filme</span>
                          <FaExternalLinkAlt fontSize={"20px"} />
                        </Flex>
                      </a>
                    )}
                    <span className="text-4xl">
                      {data?.vote_average.toFixed(1)}/10
                    </span>

                    <Box>
                      <Image
                        src={`https://image.tmdb.org/t/p/w300/${data?.production_companies[0].logo_path}`}
                        alt={`Imagem da companhia '${data?.production_companies[0].name}'`}
                        objectFit="cover"
                        className="w-full h-full scale-50"
                      />
                    </Box>
                    <Flex gap="40px">
                      <Button
                        colorScheme="gray"
                        _hover={{ color: "#fff", background: "#ccc2" }}
                        color="#000"
                      >
                        Assistir mais Tarde
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="gray"
                        _hover={{ background: "#ccc2" }}
                        color="#fffd"
                      >
                        <IconButton
                          fontSize="4xl"
                          colorScheme="transparent"
                          aria-label="Search"
                          color="#c7c7c7"
                          icon={<CiHeart />}
                        />
                      </Button>
                    </Flex>
                  </Flex>
                </Skeleton>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
