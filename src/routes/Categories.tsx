import { Container } from "@chakra-ui/react";
import ListCategories from "../components/ListCategories";
import TitleDescription from "../components/TitleDescription";
import useTitle from "../hooks/useTitle";

export default function Categories() {
  useTitle("Categorias");

  return (
    <main>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mt={{ base: "170px", sm: "200px" }}
        mb="150px"
      >
        <TitleDescription
          title="Categorias"
          description="Listagem de todas as categorias de filmes disponíveis para você aproveitar!"
        />
        <ListCategories />
      </Container>
    </main>
  );
}
