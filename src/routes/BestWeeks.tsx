import { Container, Flex } from "@chakra-ui/react";

import TopList from "../components/TopList";
import useGetMovies from "../hooks/useGetMovies";
import TopListMovieInfo from "../components/TopList/TopListMovieInfo";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import useTitle from "../hooks/useTitle";

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

  const [items, setItems] = useLocalStorage<movieType[] | never[]>(
    "weekItems",
    []
  );
  const [currentItem] = useLocalStorage("weekCurrentItem", []);

  useEffect(() => {
    if (!isPending && data) {
      setItems(data.results);
      console.log(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  console.log(currentItem);

  useTitle("Melhores");

  return (
    <main>
      <Container
        maxW="1580px"
        px={{ base: "30px", md: "10px" }}
        mt={{ base: "170px", sm: "200px" }}
        mb="150px"
      >
        <Flex maxW="1320px" mx="auto" gap={{ md: "40px", "2xl": "80px" }}>
          <TopList data={data} isPending={isPending} />
          <TopListMovieInfo isLoading={isPending} />
        </Flex>
      </Container>
    </main>
  );
}
