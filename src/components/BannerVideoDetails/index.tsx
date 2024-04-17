import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface companieProp {
  id: number;
  logo_path: string;
  name: string;
}

interface genreProp {
  name: string;
}

interface propType {
  data: {
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

export default function BannerVideoDetails({ data }: propType) {
  return (
    <>
      <Box
        background={`url(https://image.tmdb.org/t/p/original${data["backdrop_path"]})`}
        backgroundPosition={["left", null, "center"]}
        backgroundRepeat="no-repeat"
        position={"relative"}
        backgroundSize="cover"
        height="70vh"
        width={"full"}
        overflow={"hidden"}
      >
        <div className="absolute inset-0 bg-black/80 z-10 "></div>
        <Box position={"relative"} zIndex={20}></Box>
      </Box>
      <Box
        h="100%"
        position={"absolute"}
        zIndex={10}
        left={"10%"}
        bottom={"-40%"}
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
      >
        <Flex h="80%" gap="80px">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`Imagem da capa do filme ${data.title}`}
            className="h-full"
          />
          <Flex flexDir="column" justifyContent={"space-between"}>
            <Flex gap="20px" flexDir="column">
              <span className="text-2xl font-bold text-[#fffd]">
                {data.release_date.split("-")[0]}
              </span>
              <Heading as="h1" fontSize={"6xl"}>
                {data.title}
              </Heading>
              <Text fontSize={"large"} lineHeight={"34px"} color="#fffd">
                {data.overview}
              </Text>
              <Box mt="20px">
                <UnorderedList
                  style={{ display: "flex", gap: "40px", margin: "0" }}
                  color="#fffd"
                >
                  <ListItem style={{ listStyle: "none" }}>
                    <span>{Math.floor(data.runtime / 60)}h </span>
                    <span>{data.runtime % 60}min</span>
                  </ListItem>
                  <ListItem>
                    <span>{Number(data.release_date.split("-")[2])} </span>
                    <span>
                      de {months[Number(data.release_date.split("-")[1])]}
                    </span>
                    <span> de {data.release_date.split("-")[0]}</span>
                  </ListItem>
                  <ListItem>
                    {data.genres.map((genre, index) => (
                      <span key={index}>
                        {genre.name}
                        {index < data.genres.length - 1 && ", "}
                      </span>
                    ))}
                  </ListItem>
                </UnorderedList>
              </Box>
            </Flex>
            <Box h="20%">
              <Flex
                alignItems="center"
                justifyContent={"space-between"}
                h="100%"
                fontSize="xl"
                fontWeight={"bold"}
                color="#fffd"
              >
                {data.homepage && (
                  <a href={data.homepage} target="_blank">
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
                  {data.vote_average.toFixed(1)}/10
                </span>
                <Grid
                  templateColumns={
                    data.production_companies.length == 1
                      ? "repeat(1,1fr)"
                      : "repeat(2, 1fr)"
                  }
                  alignItems={"center"}
                >
                  {data.production_companies.map(
                    (companie) =>
                      companie.logo_path && (
                        <>
                          <GridItem key={companie.id}>
                            <Image
                              src={`https://image.tmdb.org/t/p/w300/${companie.logo_path}`}
                              alt={`Imagem da companhia '${companie.name}'`}
                              objectFit="cover"
                              className="w-full h-full scale-50"
                            />
                          </GridItem>
                        </>
                      )
                  )}
                </Grid>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
