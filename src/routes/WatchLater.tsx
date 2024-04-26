import { Box, Container, Grid } from "@chakra-ui/react";
import { useWatchLaterStore } from "../stores/watchLaterStore";
import WatchLaterItem from "../components/WatchLaterItem";
import TitleDescription from "../components/TitleDescription";

export default function WatchLater() {
  const watchLaterMovie = useWatchLaterStore((state) => state.watchLaterMovie);

  return (
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
          <Box minH={"400px"} mt={{ base: "40px", md: "80px" }}>
            <Grid
              bg="#0a0d14"
              borderRadius={"16px"}
              p="20px"
              templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
              rowGap={{ base: "18px", md: "28px" }}
            >
              {watchLaterMovie.map((item, index) => (
                <WatchLaterItem data={item} key={index} />
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </main>
  );
}
