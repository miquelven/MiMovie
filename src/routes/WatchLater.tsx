import { Box, Container, Grid, Flex, Text, Select } from "@chakra-ui/react";
import { useWatchLaterStore } from "../stores/watchLaterStore";
import WatchLaterItem from "../components/WatchLaterItem";
import TitleDescription from "../components/TitleDescription";
import { Helmet } from "react-helmet";
import EmptyState from "../components/EmptyState";
import { MdWatchLater } from "react-icons/md";
import { useState, useMemo } from "react";

export default function WatchLater() {
  const watchLaterMovie = useWatchLaterStore((state) => state.watchLaterMovie);
  const [sortBy, setSortBy] = useState<string>("date_added");

  const sortedWatchLater = useMemo(() => {
    const items = [...watchLaterMovie];

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
  }, [watchLaterMovie, sortBy]);

  return (
    <>
      <Helmet>
        <title>MiMovies | Assistir mais tarde</title>
        <meta
          name="description"
          content="Salve os filmes que você deseja assistir mais tarde no MiMovies. Explore uma lista personalizada de filmes que você selecionou para assistir posteriormente. Mantenha todos os seus filmes favoritos em um só lugar e nunca perca um título que você quer ver. Comece a montar sua lista de filmes para assistir mais tarde agora mesmo e desfrute de uma experiência cinematográfica sob medida."
        ></meta>
        <meta
          name="keywords"
          content="filmes salvos, assistir mais tarde, lista de filmes, filmes para ver depois, filmes marcados, filmes guardados, filmes pendentes"
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
          <Box>
            <TitleDescription
              title="Filmes para Assistir Mais Tarde"
              description="Explore sua lista pessoal de filmes para assistir mais tarde."
            />
            <section>
              {watchLaterMovie && watchLaterMovie.length > 0 && (
                <Flex justifyContent="flex-end" mb="20px" mt="40px">
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
              <Box minH={"400px"} mt={{ base: "20px", md: "40px" }}>
                <Grid
                  bg="#0a0d14"
                  borderRadius={"16px"}
                  p="20px"
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "repeat(2,1fr)",
                  }}
                  rowGap={{ base: "18px", md: "28px" }}
                >
                  {sortedWatchLater && sortedWatchLater.length > 0 ? (
                    sortedWatchLater.map((item, index) => (
                      <WatchLaterItem data={item} key={item.id} />
                    ))
                  ) : (
                    <Box gridColumn="1 / -1">
                      <EmptyState
                        title="Sua lista de assistir mais tarde está vazia"
                        description="Encontrou algo interessante? Adicione à sua lista para não esquecer!"
                        icon={MdWatchLater}
                        actionText="Ver Filmes Populares"
                        actionLink="/populares"
                      />
                    </Box>
                  )}
                </Grid>
              </Box>
            </section>
          </Box>
        </Container>
      </main>
    </>
  );
}
