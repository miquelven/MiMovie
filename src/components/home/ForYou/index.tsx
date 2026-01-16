import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useFavoriteMoviesStore } from "../../../stores/favoriteStore";
import CarouselMovies from "../../Carousel/CarouselMovies";
import { useMemo } from "react";

export default function ForYou() {
  const favorites = useFavoriteMoviesStore((state) => state.favoriteMovie);

  const genreQuery = useMemo(() => {
    if (favorites.length === 0) return null;

    const genreCounts: Record<number, number> = {};
    let hasGenres = false;

    favorites.forEach((movie) => {
      if (movie.genre_ids && movie.genre_ids.length > 0) {
        hasGenres = true;
        movie.genre_ids.forEach((id) => {
          genreCounts[id] = (genreCounts[id] || 0) + 1;
        });
      }
    });

    if (!hasGenres) return null;

    // Get top 2 genres
    const sortedGenres = Object.entries(genreCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([id]) => id)
      .slice(0, 2);

    return sortedGenres.join(",");
  }, [favorites]);

  if (!genreQuery) {
    return null;
  }

  return (
    <Container maxW="1580px" px={{ base: "30px", md: "10px" }} mt="80px">
      <Heading as="h2" fontSize="2xl" mb="4" color="white">
        Para você
      </Heading>
      <Text color="gray.400" mb="6">
        Recomendações baseadas nos seus gêneros favoritos
      </Text>
      <Box>
        <CarouselMovies
          endpoint={`discover/movie?with_genres=${genreQuery}&language=pt-BR&sort_by=popularity.desc&page=`}
        />
      </Box>
    </Container>
  );
}
