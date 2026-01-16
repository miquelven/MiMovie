import { Container, Heading } from "@chakra-ui/react";
import { useLocalStorage } from "usehooks-ts";
import CarouselMovies from "../../Carousel/CarouselMovies";

export default function SimilarMoviesArea() {
  const [currentMovieId] = useLocalStorage("currentMovie", 0);

  if (!currentMovieId) return null;

  return (
    <section style={{ marginTop: "80px", marginBottom: "80px" }}>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mb={{ base: "20px", md: "32px" }}
      >
        <Heading textAlign={{ base: "center", md: "left" }}>
          Filmes Semelhantes
        </Heading>
      </Container>
      <CarouselMovies
        endpoint={`movie/${currentMovieId}/similar?language=pt-BR&page=`}
      />
    </section>
  );
}
