import { Container } from "@chakra-ui/react";
import ListCategories from "../components/ListCategories";
import TitleDescription from "../components/TitleDescription";
import { Helmet } from "react-helmet";

export default function Categories() {
  return (
    <>
      <Helmet>
        <title>MiMovies | Categorias</title>
        <meta
          name="description"
          content="Explore uma variedade de categorias de filmes no MiMovies. Navegue por gêneros populares, como ação, comédia, drama e muito mais. Encontre facilmente os filmes que correspondem aos seus interesses e descubra novos favoritos em cada categoria. Comece a sua jornada cinematográfica agora e mergulhe em uma experiência única de entretenimento."
        ></meta>
        <meta
          name="keywords"
          content="filmes, filmes online, assistir filmes, categorias de filmes, gêneros de filmes, ação, comédia, drama, terror, romance, ficção científica, animação, aventura, thriller"
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
          <TitleDescription
            title="Categorias"
            description="Listagem de todas as categorias de filmes disponíveis para você aproveitar!"
          />
          <ListCategories />
        </Container>
      </main>
    </>
  );
}
