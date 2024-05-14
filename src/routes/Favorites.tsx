import { Box, Center, Container, Grid, Heading } from "@chakra-ui/react";
import { useFavoriteMoviesStore } from "../stores/favoriteStore";
import FavoriteItem from "../components/FavoriteItem";
import TitleDescription from "../components/TitleDescription";
import { Helmet } from "react-helmet";

export default function Favorites() {
  const favoritesMovie = useFavoriteMoviesStore((state) => state.favoriteMovie);

  return (
    <>
      <Helmet>
        <title>MiMovies | Favoritos</title>
        <meta
          name="description"
          content="Gerencie facilmente sua lista de filmes favoritos no MiMovies. Adicione seus filmes preferidos à sua lista de favoritos para acessá-los facilmente sempre que desejar. Mantenha-se atualizado com suas escolhas de filmes e nunca perca um título que você ama. Comece a organizar sua lista de favoritos agora e tenha seus filmes prediletos ao alcance de um clique"
        ></meta>
        <meta
          name="keywords"
          content="filmes favoritos, lista de filmes, gerenciador de filmes, filmes para assistir, filmes que amo, filmes marcados, filmes preferidos, filmes salvos"
        ></meta>
        <meta name="author" content="MiMovies"></meta>
      </Helmet>
      <main>
        <Container
          maxW="1580px"
          px={{ base: "30px", md: "10px" }}
          mt={{ base: "170px", sm: "200px" }}
        >
          <TitleDescription
            title="Filmes Favoritos"
            description="Nossa página de favoritos torna fácil encontrar e ver informações dos filmes que você ama."
          />

          {/* no favorites warning */}
          <Box minH={"400px"} mt={{ base: "60px", md: "100px" }}>
            {favoritesMovie.length == 0 && (
              <Center minH={"400px"} bg="#1c212e" borderRadius={"12px"}>
                <Heading fontSize={{ base: "sm", md: "xl", xl: "3xl" }} as="h5">
                  Favorite filmes para poder vê-los aqui!
                </Heading>
              </Center>
            )}

            {/* favorite list */}
            <section>
              <Grid
                mt={{ base: "80px", md: "80px" }}
                templateColumns={{
                  base: "repeat(2,1fr)",
                  sm: "repeat(3,1fr)",
                  md: "repeat(4,1fr)",
                }}
                gap={{ base: "20px", md: "80px" }}
                rowGap={{ base: "40px", md: "120px" }}
              >
                {favoritesMovie.length > 0 &&
                  favoritesMovie.map((item, index) => (
                    <FavoriteItem key={index} index={index} data={item} />
                  ))}
              </Grid>
            </section>
          </Box>
        </Container>
      </main>
    </>
  );
}
