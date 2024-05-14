import { Box, Center, Container, Grid, Text } from "@chakra-ui/react";
import { useWatchLaterStore } from "../stores/watchLaterStore";
import WatchLaterItem from "../components/WatchLaterItem";
import TitleDescription from "../components/TitleDescription";
import { Helmet } from "react-helmet";

export default function WatchLater() {
  const watchLaterMovie = useWatchLaterStore((state) => state.watchLaterMovie);

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
              <Box minH={"400px"} mt={{ base: "40px", md: "80px" }}>
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
                  {watchLaterMovie ? (
                    watchLaterMovie.map((item, index) => (
                      <WatchLaterItem data={item} key={index} />
                    ))
                  ) : (
                    <Center>
                      <Text fontSize={{ base: "sm", sm: "base", md: "lg" }}>
                        Selecione filmes para assistir mais tarde para eles
                        aparecerem aqui
                      </Text>
                    </Center>
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
