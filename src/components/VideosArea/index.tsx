import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import CarouselTrailers from "./CarouselTrailers/index.tsx";

export default function VideosArea() {
  return (
    <section className="pt-20 pb-32 w-full bg-[#0a0d14] max-md:pb-20 max-sm:pb-0 max-sm:pt-28">
      <Container
        maxW="1580px"
        px={{ base: "30px", lg: "10px" }}
        position="relative"
      >
        <Flex
          justifyContent={"center"}
          gap={{ base: "60px", lg: "120px" }}
          mb="60px"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Heading as="h2">Trailers</Heading>
          <Text
            maxW="800px"
            color="#fff9"
            fontSize={{ base: "sm", sm: "md", lg: "lg" }}
            textAlign={"justify"}
          >
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
