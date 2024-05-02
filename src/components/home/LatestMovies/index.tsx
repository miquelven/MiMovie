import { Center, Container, Flex, Heading, Text } from "@chakra-ui/react";
import CarouselMovies from "../../Carousel/CarouselMovies";

export default function LatestMovies() {
  return (
    <section className="relative min-h-72 pb-40 pt-40">
      <div className="bg-[#131722] absolute left-0 top-[-30%] right-0 h-full max-xl:top-[-50%]"></div>
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
          >
            <Heading as="h2">Últimos Lançamentos</Heading>
            <Text
              maxW="800px"
              color="#fff9"
              textAlign={"justify"}
              fontSize={{ base: "xs", sm: "md" }}
              px={{ base: "30px", xl: "0px" }}
            >
              Descubra o que há de mais recente no entretenimento com as nossas
              principais escolhas de filmes! De blockbusters emocionantes a
              dramas cativantes, entregue-se a um mundo de possibilidades
              infinitas. Mantenha-se atualizado com nossa coleção constantemente
              atualizada e mergulhe na experiência de visualização definitiva.
              Não perca!
            </Text>
          </Flex>
        </Center>
      </Container>
      <CarouselMovies />
    </section>
  );
}
