import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";

interface itemType {
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
    <section className="py-32">
      <Container maxW="1580px" px="10px" position="relative">
        <Grid templateColumns={"repeat(7, 1fr)"} gap="24px">
          <GridItem colSpan={2}>
            <Center h="100%">
              <Box>
                <Heading as="h3">Filmes Populares para Assistir Agora</Heading>
                <Text>Filmes mais assistidos</Text>

                <Link className="border-t block border-white/30" to="#">
                  Ver Mais
                </Link>
              </Box>
            </Center>
          </GridItem>
          {!isPending &&
            data.results.map(
              (item: itemType, index: number) =>
                index < 12 && <CardMovie key={index} data={item} />
            )}
        </Grid>
      </Container>
    </section>
  );
}
