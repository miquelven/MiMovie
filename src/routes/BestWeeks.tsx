import { Container, Flex } from "@chakra-ui/react";

import TopList from "../components/bestweeks/TopList";
import useGetMovies from "../hooks/useGetMovies";
import TopListMovieInfo from "../components/bestweeks/TopList/TopListMovieInfo";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Helmet } from "react-helmet";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
}

export default function BestWeek() {
  const { data, isPending } = useGetMovies(
    "trending/movie/week?language=pt-BR",
    1
  );

  const [, setItems] = useLocalStorage<movieType[] | never[]>("weekItems", []);
  const [currentItem] = useLocalStorage("weekCurrentItem", []);

  useEffect(() => {
    if (!isPending && data) {
      setItems(data.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  console.log(currentItem);

  return (
    <>
      <Helmet>
        <title>MiMovies | Melhores</title>
        <meta
          name="description"
          content="Explore um vasto catálogo de filmes no MiMovies. Descubra informações detalhadas sobre seus filmes favoritos, incluindo sinopses, elenco, avaliações, trailers e muito mais. Esteja por dentro das últimas novidades do mundo do cinema e encontre facilmente o próximo filme para assistir. Transforme suas noites em verdadeiras sessões de cinema com o nosso site. Divirta-se explorando!"
        ></meta>
        <meta
          name="keywords"
          content="filmes, cinema, assistir filmes, catálogo de filmes, sinopse de filmes, elenco de filmes, avaliações de filmes, trailers de filmes"
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
          <section>
            <Flex maxW="1320px" mx="auto" gap={{ md: "40px", "2xl": "80px" }}>
              <TopList data={data} isPending={isPending} />
              <TopListMovieInfo isLoading={isPending} />
            </Flex>
          </section>
        </Container>
      </main>
    </>
  );
}
