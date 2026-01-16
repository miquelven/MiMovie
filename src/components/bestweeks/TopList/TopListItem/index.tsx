import { Box, Divider, Flex, Heading, Hide, Text } from "@chakra-ui/react";
import useGetAllGenres from "../../../../hooks/useGetAllGenres";
import { useState, useEffect } from "react";

import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import setCurrentMovie from "../../../../helpers/setCurrentMovie";
import TmdbImage from "../../../ui/TmdbImage";

interface itemType {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
}

interface PropsType {
  item: itemType;
  ranked: number;
}

interface genreProp {
  id: number;
  name: string;
}

interface currentItemProp {
  title: string;
}

export default function TopListItem({ item, ranked }: PropsType) {
  const [currentItem, setCurrentItem] = useLocalStorage<currentItemProp | null>(
    "weekCurrentItem",
    null
  );
  const navigate = useNavigate();

  const { data, isPending } = useGetAllGenres();

  const [genres, setGenres] = useState<string[]>([]);

  if (!isPending && data.genres.length > 0 && genres.length == 0) {
    for (let i = 0; i < item.genre_ids.length; i++) {
      data.genres.map((genre: genreProp) => {
        if (genre.id == item.genre_ids[i]) {
          setGenres((oldvalue) => [...oldvalue, genre.name]);
        }
      });
    }
  }

  const handleClick = () => {
    setCurrentItem(item);
    setCurrentMovie(item.id);
    navigate(`/${item.title.split(" ").join("-")}`);
  };

  useEffect(() => {
    setCurrentItem(item);
    if (localStorage.getItem("weekCurrentItem")) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentItem && (
        <Box
          pt="16px"
          rounded="xl"
          mb="4"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.02)", bg: "#2d323f" }}
          className={`cursor-pointer ${
            currentItem!.title == item.title ? "bg-[#2d323f]" : "bg-[#1c212e]"
          }`}
          onClick={handleClick}
        >
          <Flex
            flexDir={{ base: "column-reverse", sm: "row" }}
            justifyContent={{ base: "flex-start", sm: "space-between" }}
            gap="20px"
            position={"relative"}
          >
            <Flex gap="12px" alignItems={"center"} flexWrap={"wrap"}>
              <Text
                fontSize={{ sm: "2xl", xl: "4xl" }}
                p="14px"
                fontWeight={"bold"}
                color={currentItem!.title == item.title ? "#23a7d7" : "white"}
              >
                {ranked}
              </Text>
              <Flex
                flex="1"
                flexDir={"column"}
                justifyContent={"center"}
                gap="8px"
              >
                <Text
                  fontSize={{ base: "xs", sm: "sm", xl: "medium" }}
                  color="#fff9"
                >
                  {item.release_date.split("-")[0]}
                </Text>
                <Heading as="h2" fontSize={{ sm: "lg" }}>
                  {item.title}
                </Heading>
                <Flex gap="8px" flexWrap={"wrap"}>
                  {genres &&
                    genres.map((genre, index) => (
                      <Text key={index} fontSize={"xs"} color={"#fff8"}>
                        {genre}
                      </Text>
                    ))}
                </Flex>
              </Flex>
            </Flex>
            <Hide above="lg">
              <TmdbImage
                path={item.poster_path}
                type="poster"
                alt={`Imagem do filme ${item.title}`}
                className="object-cover w-20 self-center"
                sizes="80px"
              />
            </Hide>
          </Flex>
          <Divider pt="20px" borderColor={"#fff4"} />
        </Box>
      )}
    </>
  );
}
