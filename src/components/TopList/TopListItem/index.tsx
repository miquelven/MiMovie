import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import useGetAllGenres from "../../../hooks/useGetAllGenres";
import { useState, useEffect } from "react";

import { useLocalStorage } from "usehooks-ts";

interface itemType {
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
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
          className={`hover:bg-[#2d323f] cursor-pointer ${
            currentItem!.title == item.title ? "bg-[#2d323f]" : "bg-[#1c212e]"
          }`}
          onClick={handleClick}
        >
          <Flex gap="12px">
            <Text fontSize="32px" p="14px" fontWeight={"bold"}>
              {ranked}
            </Text>
            <Flex
              flex="1"
              flexDir={"column"}
              justifyContent={"center"}
              gap="8px"
            >
              <Text fontSize={"14px"} color="#fff9">
                {item.release_date.split("-")[0]}
              </Text>
              <Heading as="h5" fontSize={"18px"}>
                {item.title}
              </Heading>
              <Flex gap="8px">
                {genres &&
                  genres.map((genre, index) => (
                    <Text key={index} fontSize={"12px"} color={"#fff8"}>
                      {genre}
                    </Text>
                  ))}
              </Flex>
            </Flex>
          </Flex>
          <Divider pt="20px" borderColor={"#fff4"} />
        </Box>
      )}
    </>
  );
}
