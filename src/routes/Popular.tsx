import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import { Helmet } from "react-helmet";

export default function Popular() {
  return (
    <>
      <Helmet>
        <title>MiMovies | Populares</title>
        <meta
          name="description"
          content="Descubra os filmes mais populares e aclamados pela crítica no MiMovies. Explore uma seleção abrangente de filmes que estão em alta, desde sucessos de bilheteria até filmes premiados. Mantenha-se atualizado com as tendências do mundo do cinema e encontre facilmente os filmes que todos estão falando. Comece sua jornada cinematográfica agora e desfrute dos melhores filmes populares."
        ></meta>
        <meta
          name="keywords"
          content="filmes populares, filmes mais vistos, filmes aclamados, sucesso de bilheteria, filmes em alta, tendências do cinema, filmes premiados"
        ></meta>
        <meta name="author" content="MiMovies"></meta>
      </Helmet>
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
    </>
  );
}
