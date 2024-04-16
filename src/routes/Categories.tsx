import { Center, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ListCategories from "../components/ListCategories";

export default function Categories() {
  return (
    <main>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mt={{ base: "170px", sm: "200px" }}
        mb="150px"
      >
        <Center>
          <Flex flexDir={"column"} textAlign={"center"} gap="16px">
            <Heading as="h1" fontSize={{ base: "xl", sm: "3xl", md: "4xl" }}>
              Categorias
            </Heading>
            <Text
              color="#fff9"
              fontSize={{ base: "xs", sm: "sm", md: "medium" }}
            >
              Listagem de todas as categorias de filmes disponiveis para você
              aproveitar!
            </Text>
          </Flex>
        </Center>
        <ListCategories />
      </Container>
    </main>
  );
}
