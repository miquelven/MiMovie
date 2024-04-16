import { Box, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";
import Pagination from "../Pagination/index.tsx";
import { useState } from "react";

interface itemType {
  poster_path: string;
  title: string;
  release_date: string;
}

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
    <section className="h-[calc(100vh+550px)] relative">
      <Box>
        <Center>
          <Flex flexDir={"column"} textAlign={"center"} gap="24px">
            <Heading as="h1" fontSize={{ base: "xl", sm: "3xl", md: "4xl" }}>
              {title}
            </Heading>
            <Text
              color="#fff9"
              fontSize={{ base: "xs", sm: "sm", md: "medium" }}
            >
              {desc}
            </Text>
          </Flex>
        </Center>
      </Box>
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
          data.results.map(
            (item: itemType, index: number) =>
              index < 12 && (
                <CardMovie key={index} data={item} isLoading={isPending} />
              )
          )}
      </Grid>
      <Pagination infos={{ setPage, pageSelected: currentPage, isPending }} />
    </section>
  );
}
