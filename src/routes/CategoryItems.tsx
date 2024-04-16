import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import { useLocalStorage } from "usehooks-ts";

interface selectedGenreProp {
  id: number;
  name: string;
}

export default function CategoryItems() {
  const [selectedGenre] = useLocalStorage<selectedGenreProp | null>(
    "selectedGenre",
    null
  );

  return (
    <main>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mt={{ base: "170px", sm: "200px" }}
        mb="150px"
      >
        <ListMovies
          title={`Filmes de ${selectedGenre!.name}`}
          desc={`
          Descubra uma seleção exclusiva dos melhores filmes de  ${selectedGenre!.name.toLowerCase()}  disponíveis.`}
          url={`discover/movie?with_genres=${
            selectedGenre!.id
          }&language=pt-BR&page=`}
        />
      </Container>
    </main>
  );
}
