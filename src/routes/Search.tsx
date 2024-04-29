import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import { useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export default function Search() {
  const params = useParams();

  useTitle(`${params.name}`);

  return (
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
  );
}
