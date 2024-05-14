import { Container } from "@chakra-ui/react";
import ListMovies from "../components/ListMovies";
import { useLocalStorage } from "usehooks-ts";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>MiMovies | {`Categoria ${selectedGenre!.name}`}</title>
        <meta
          name="description"
          content="Explore uma variedade de emocionantes filmes em diversas categorias no MiMovies. De ação cheia de adrenalina a dramas comoventes, passando por comédias hilariantes e romances apaixonantes, nossa ampla seleção de gêneros oferece algo para todos os gostos. Encontre facilmente os filmes que mais lhe interessam e descubra novas pérolas cinematográficas em cada categoria. Comece a sua jornada de descoberta agora e mergulhe em um mundo de entretenimento cinematográfico."
        ></meta>
        <meta
          name="keywords"
          content="filmes, filmes online, categorias de filmes, gêneros de filmes, ação, comédia, drama, terror, romance, ficção científica, animação, aventura"
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
            title={`Filmes de ${selectedGenre!.name}`}
            desc={`
          Descubra uma seleção exclusiva dos melhores filmes de  ${selectedGenre!.name.toLowerCase()}  disponíveis.`}
            url={`discover/movie?with_genres=${
              selectedGenre!.id
            }&language=pt-BR&page=`}
          />
        </Container>
      </main>
    </>
  );
}
