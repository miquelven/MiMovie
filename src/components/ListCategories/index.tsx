import { Box, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
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

const MotionGridItem = motion(GridItem);

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
          rowGap={{ base: "50px", sm: "60px", lg: "80px" }}
          columnGap={{ base: "0px", sm: "20px", lg: "40px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {!isPending &&
            allGenres.genres.map((genre: genreType, index: number) => (
              <MotionGridItem
                key={genre.id}
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
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
              </MotionGridItem>
            ))}
        </Grid>
      </Box>
    </section>
  );
}
