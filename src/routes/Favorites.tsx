import { Box, Center, Container, Grid, Heading } from "@chakra-ui/react";
import { useFavoriteMoviesStore } from "../stores/favoriteStore";
import FavoriteItem from "../components/FavoriteItem";
import TitleDescription from "../components/TitleDescription";

export default function Favorites() {
  const favoritesMovie = useFavoriteMoviesStore((state) => state.favoriteMovie);

  return (
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
              <Heading
                fontSize={{ base: "large", md: "xl", xl: "3xl" }}
                as="h5"
              >
                Favorite filmes para poder vê-los aqui!
              </Heading>
            </Center>
          )}

          {/* favorite list */}
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
        </Box>
      </Container>
    </main>
  );
}
