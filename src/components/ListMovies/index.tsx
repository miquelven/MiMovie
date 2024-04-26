import { Grid, Spinner } from "@chakra-ui/react";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";
import { useState } from "react";
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
  return (
    <section className="min-h-[calc(100vh+550px)] relative">
      {isPending && (
        <div className="fixed inset-0 bg-black/70 flex z-20 justify-center items-center scale-150">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      )}
      <TitleDescription title={title} description={desc} />
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={{ sm: "20px", lg: "40px" }}
        rowGap={"80px"}
        mt="80px"
      >
        {!isPending &&
          data?.results.map(
            (item, index: number) =>
              index < 12 && <CardMovie key={index} data={item} />
          )}
      </Grid>

      <PaginationArea
        infos={{ setPage, pageSelected: currentPage, isPending }}
      />
    </section>
  );
}
