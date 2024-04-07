import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import CarouselTrailers from "./CarouselTrailers/index.tsx";

export default function VideosArea() {
  return (
    <section className="pt-20 pb-44 mb-20 w-full bg-[#0a0d14]">
      <Container maxW="1580px" px="10px" position="relative">
        <Flex justifyContent={"center"} gap="120px">
          <Heading as="h2">Trailers</Heading>
          <Text maxW="800px" fontSize={"lg"} textAlign={"justify"}>
            Desfrute de uma prévia cinematográfica de alguns dos filmes mais
            cativantes em nossa coleção. Prepare-se para uma experiência visual
            única enquanto você navega pelos trailers selecionados especialmente
            para você. Uma dose de antecipação para alimentar sua paixão pelo
            cinema!
          </Text>
        </Flex>
        <CarouselTrailers />
      </Container>
    </section>
  );
}
