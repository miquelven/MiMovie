import { Box, Container, Grid, Flex, Text, Select } from "@chakra-ui/react";
import { useFavoriteMoviesStore } from "../stores/favoriteStore";
import FavoriteItem from "../components/FavoriteItem";
import TitleDescription from "../components/TitleDescription";
import { Helmet } from "react-helmet";
import EmptyState from "../components/EmptyState";
import { FaHeartBroken } from "react-icons/fa";
import { useState, useMemo } from "react";

export default function Favorites() {
  const favoritesMovie = useFavoriteMoviesStore((state) => state.favoriteMovie);
  const [sortBy, setSortBy] = useState<string>("date_added");

  const sortedFavorites = useMemo(() => {
    const items = [...favoritesMovie];

    items.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "date":
          return (
            new Date(b.release_date || 0).getTime() -
            new Date(a.release_date || 0).getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        case "date_added":
        default:
          return 0;
      }
    });

    return items;
  }, [favoritesMovie, sortBy]);

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
              <EmptyState
                title="Você ainda não tem filmes favoritos"
                description="Explore o catálogo e adicione filmes aos seus favoritos para vê-los aqui."
                icon={FaHeartBroken}
                actionText="Explorar Filmes"
                actionLink="/"
              />
            )}

            {/* favorite list */}
            <section>
              {favoritesMovie.length > 0 && (
                <Flex justifyContent="flex-end" mt="40px">
                  <Box minW={{ base: "100%", md: "200px" }}>
                    <Text mb="6px" fontSize="sm" color="#fff9">
                      Ordenar por
                    </Text>
                    <Select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      bg="#131722"
                      borderColor="#2d323f"
                      _hover={{ borderColor: "#4a5163" }}
                      _focus={{
                        borderColor: "#23a7d7",
                        boxShadow: "0 0 0 1px #23a7d7",
                      }}
                    >
                      <option value="date_added">
                        Adicionados recentemente
                      </option>
                      <option value="popularity">Mais populares</option>
                      <option value="rating">Melhor avaliados</option>
                      <option value="date">Mais recentes (Lançamento)</option>
                      <option value="az">A-Z</option>
                    </Select>
                  </Box>
                </Flex>
              )}

              <Grid
                mt={{ base: "40px", md: "40px" }}
                templateColumns={{
                  base: "repeat(2,1fr)",
                  sm: "repeat(3,1fr)",
                  md: "repeat(4,1fr)",
                }}
                gap={{ base: "20px", md: "80px" }}
                rowGap={{ base: "40px", md: "120px" }}
              >
                {sortedFavorites.length > 0 &&
                  sortedFavorites.map((item, index) => (
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
