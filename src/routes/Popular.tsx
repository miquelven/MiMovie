import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import useTitle from "../hooks/useTitle";

export default function Popular() {
  useTitle("Populares");

  return (
    <main>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mt={{ base: "170px", sm: "200px" }}
        mb="150px"
      >
        <ListMovies
          title="Listagem dos filmes populares"
          desc="Descubra os filmes mais badalados do momento nesta lista de sucessos de bilheteria e crítica."
          url="movie/popular?language=pt-BR&page="
        />
      </Container>
    </main>
  );
}
