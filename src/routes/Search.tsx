import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Search() {
  const params = useParams();

  return (
    <>
      <Helmet>
        <title>MiMovies | {`${params.name}`}</title>
        <meta
          name="description"
          content="Encontre facilmente os filmes que você procura com os resultados de pesquisa do MiMovies. Explore uma lista abrangente de filmes que correspondem à sua pesquisa, incluindo sinopse, elenco, avaliações e muito mais. Seja qual for o filme que você está procurando, nós temos tudo aqui. Comece sua busca agora e encontre seu filme perfeito no MiMovies."
        ></meta>
        <meta
          name="keywords"
          content="filmes, pesquisa de filmes, resultados de pesquisa, filmes encontrados, filmes sugeridos, filmes correspondentes, filmes relacionados, filmes recomendados"
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
            title={`Resultados da pesquisa: ${params.name}`}
            desc="O lugar onde você encontra todos os resultados da sua pesquisa."
            url={`search/movie?query=${params.name}&language=pt-BR&page=`}
          />
        </Container>
      </main>
    </>
  );
}
