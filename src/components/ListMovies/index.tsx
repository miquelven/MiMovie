import { Grid, Skeleton } from "@chakra-ui/react";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";
import { useEffect, useState } from "react";
import PaginationArea from "../PaginationArea";
import TitleDescription from "../TitleDescription";
interface propType {
  title: string;
  desc: string;
  url: string;
}

export default function ListMovies({ title, desc, url }: propType) {
  const [currentPage, setCurrentPage] = useState(1);

  const setPage = (newValue: number) => {
    setCurrentPage(newValue);
  };

  const { data, isPending } = useGetMovies(url, currentPage);

  useEffect(() => setCurrentPage(1), [url]);

  return (
    <section className="min-h-screen relative">
      <TitleDescription title={title} description={desc} />
      <Skeleton
        isLoaded={!isPending}
        startColor="#2d323f"
        endColor="#131722"
        mt="80px"
        borderRadius="md"
        minH="300px"
      >
        {!isPending && data && data?.results.length > 0 ? (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={{ sm: "20px", lg: "40px" }}
            rowGap={"80px"}
          >
            {!isPending &&
              data?.results.map(
                (item, index: number) =>
                  index < 12 && <CardMovie key={index} data={item} />
              )}
          </Grid>
        ) : (
          <span className="w-full text-center text-4xl font-medium block mt-60 text-white/70 max-sm:text-xl max-sm:mt-40">
            Nenhum filme encontrado!
          </span>
        )}
      </Skeleton>

      {!isPending && data && data?.results.length > 0 && (
        <PaginationArea
          infos={{
            setPage,
            pageSelected: currentPage,
            isPending,
            totalPages: data.total_pages,
          }}
        />
      )}
    </section>
  );
}
