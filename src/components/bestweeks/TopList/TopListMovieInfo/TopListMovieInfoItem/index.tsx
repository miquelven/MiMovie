import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import useGetAllGenres from "../../../../../hooks/useGetAllGenres";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface itemProp {
  title: string;
}

interface genreProp {
  id: number;
  name: string;
}

interface dataProp {
  data: {
    genre_ids: number[];
    title: string;
    release_date: string;
    poster_path: string;
  };
}

export default function TopListMovieInfoItem({ data }: dataProp) {
  const { data: allGenres, isPending } = useGetAllGenres();

  const [currentItem, setCurrentItem] = useLocalStorage<itemProp | null>(
    "weekCurrentItem",
    null
  );

  const [genres, setGenres] = useState<string[]>([]);

  if (!isPending && allGenres.genres.length > 0 && genres.length == 0) {
    for (let i = 0; i < data.genre_ids.length; i++) {
      allGenres.genres.map((genre: genreProp) => {
        if (genre.id == data.genre_ids[i]) {
          setGenres((oldvalue) => [...oldvalue, genre.name]);
        }
      });
    }
  }

  return (
    <>
      {data && currentItem && (
        <GridItem
          _hover={{ background: "#2d323f", cursor: "pointer" }}
          style={{
            background: data.title == currentItem!.title ? "#2d323f" : "",
          }}
          onClick={() => setCurrentItem(data)}
        >
          <Flex alignItems={"center"} gap="24px">
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt={`Imagem do filme ${data.title}`}
              className="w-1/3"
            />
            <Flex flexDir={"column"} gap="24px">
              <Box>
                <Text fontSize={{ md: "xs", xl: "medium" }} color="#fff9">
                  {data.release_date.split("-")[0]}
                </Text>
                <Heading as="h6" fontSize={{ md: "medium", xl: "xl" }}>
                  {data.title}
                </Heading>
              </Box>
              <Flex gap="12px" flexWrap={"wrap"}>
                {genres &&
                  genres.map((genre, index) => (
                    <Text key={index} fontSize={"xs"} color={"#23a7d7"}>
                      {genre}
                    </Text>
                  ))}
              </Flex>
            </Flex>
          </Flex>
        </GridItem>
      )}
    </>
  );
}
