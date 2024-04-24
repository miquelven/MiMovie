import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";

interface itemType {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
}

export default function PopularMovies() {
  const { data, isPending } = useGetMovies(
    "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=",
    1
  );

  return (
    <section className="py-32 mb-40">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 300px)",
              sm: "repeat(2, 200px)",
              md: "repeat(3, 200px)",
              lg: "repeat(5, 150px)",
              xl: "repeat(6, 200px)",
              "2xl": "repeat(7, 1fr)",
            }}
            gap="24px"
            rowGap={"60px"}
            maxH={{ base: "2370px", sm: "auto" }}
            overflow="hidden"
          >
            <GridItem
              colSpan={{ base: 1, sm: 2, md: 3, lg: 2 }}
              mb={{ base: "32px" }}
            >
              <Center h="100%">
                <Flex flexDir={"column"} gap="52px" color="#fff9">
                  <Box>
                    <Heading as="h3" color="#fff">
                      Filmes Populares para Assistir Agora
                    </Heading>
                    <Text mt="16px">Filmes mais assistidos</Text>
                  </Box>

                  <Link
                    className="transition-all duration-300 border-t block border-white/30 hover:text-white max-sm:hidden"
                    to={`/populares`}
                  >
                    Ver Mais
                  </Link>
                </Flex>
              </Center>
            </GridItem>
            {!isPending &&
              data &&
              data.results.map(
                (item: itemType, index: number) =>
                  index < 12 && (
                    <CardMovie key={index} data={item} isLoading={isPending} />
                  )
              )}
          </Grid>
          <Link
            className="transition-all duration-300 text-white/60 mt-14 hover:text-white hover:underline  sm:hidden"
            to="/populares"
          >
            Ver Mais
          </Link>
        </Flex>
      </Container>
    </section>
  );
}
