import { Box, Grid, GridItem } from "@chakra-ui/react";
import useGetAllGenres from "../../hooks/useGetAllGenres";

import { categoryData } from "../../data/categoryData";
import { Link } from "react-router-dom";
import ListCategoriesItem from "./ListCategoriesItem";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";

interface genreType {
  id: number;
  name: string;
}

interface selectedGenreProp {
  id: number;
  name: string;
}

export default function ListCategories() {
  const { data: allGenres, isPending } = useGetAllGenres();

  const [selectedGenre, setSelectedGenre] =
    useLocalStorage<selectedGenreProp | null>("selectedGenre", null);

  useEffect(() => {
    if (selectedGenre) {
      setSelectedGenre(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Box mt="60px">
        <Grid
          templateColumns={{
            base: "repeat(1, 300px)",
            sm: "repeat(2,250px)",
            md: "repeat(3,1fr)",
          }}
          rowGap={{ base: "50px", sm: "60p", lg: "80px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {!isPending &&
            allGenres.genres.map((genre: genreType) => (
              <GridItem
                key={genre.id}
                className="transition-all duration-700 hover:brightness-[.4]"
              >
                {categoryData.map(
                  (category) =>
                    category.genreName == genre.name && (
                      <Link
                        onClick={() =>
                          setSelectedGenre({ id: genre.id, name: genre.name })
                        }
                        to={`/categorias/${genre.name.split(" ").join("-")}`}
                        key={category.genreName}
                      >
                        <ListCategoriesItem category={category} />
                      </Link>
                    )
                )}
              </GridItem>
            ))}
        </Grid>
      </Box>
    </section>
  );
}
