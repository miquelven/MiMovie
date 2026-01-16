import { Center, Container, Flex, Heading, Text } from "@chakra-ui/react";
import CarouselMovies from "../../Carousel/CarouselMovies";

export default function TrendingMovies() {
  return (
    <section className="relative min-h-72 pb-40 pt-20">
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        position="relative"
      >
        <Center>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            flexDir="column"
            gap="32px"
            mb="40px"
          >
            <Heading as="h2">Tendências de Hoje</Heading>
            <Text
              maxW="800px"
              color="#fff9"
              textAlign={"justify"}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: "30px", xl: "0px" }}
            >
              Fique por dentro dos filmes que estão bombando hoje! Nossa seleção
              diária traz os títulos mais comentados e assistidos do momento.
            </Text>
          </Flex>
        </Center>
      </Container>
      <CarouselMovies endpoint="trending/movie/day?language=pt-BR&page=" />
    </section>
  );
}
