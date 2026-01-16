import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Icon,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";

import { FaExternalLinkAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFavoriteMoviesStore } from "../../../stores/favoriteStore";
import { useWatchLaterStore } from "../../../stores/watchLaterStore";
import { motion, AnimatePresence } from "framer-motion";

interface genreProp {
  id: number;
  name: string;
}

interface propType {
  data?: {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    genres: genreProp[];
    runtime: number;
    homepage: string;
    vote_average: number;
    popularity: number;
  };
  isLoading: boolean;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function BannerVideoDetails({ data, isLoading }: propType) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showWatchLaterBtn, setShowWatchLaterBtn] = useState(false);
  const favoriteStore = useFavoriteMoviesStore();
  const watchLaterStore = useWatchLaterStore();
  const toast = useToast();

  const HandleClickWatchLater = () => {
    if (data) {
      const videoData = {
        backdrop_path: data.backdrop_path,
        title: data.title,
        id: data.id,
      };

      if (showWatchLaterBtn) {
        watchLaterStore.removeWatchLater(data.id);
        toast({
          title: "Removido!",
          description: "Filme removido da sua lista de assistir mais tarde.",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        watchLaterStore.addWatchLater(videoData);
        toast({
          title: "Adicionado!",
          description: "Filme adicionado à sua lista de assistir mais tarde.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    setShowWatchLaterBtn((old) => !old);
  };

  const HandleClickFavoriteMovie = () => {
    if (data) {
      const videoData = {
        poster_path: data.poster_path,
        title: data.title,
        id: data.id,
        vote_average: data.vote_average,
        release_date: data.release_date,
        popularity: data.popularity,
        genre_ids: data.genres.map((g) => g.id),
      };

      if (isFavorited) {
        favoriteStore.removefavoriteMovie(data.id);
        toast({
          title: "Removido dos favoritos",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        favoriteStore.addFavorites(videoData);
        toast({
          title: "Favoritado!",
          description: "Filme adicionado aos seus favoritos.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    setIsFavorited((old) => !old);
  };

  useEffect(() => {
    if (!isLoading)
      setIsFavorited(
        favoriteStore.favoriteMovie.some((movie) => movie.id == data?.id)
      );
    setShowWatchLaterBtn(
      watchLaterStore.watchLaterMovie.some((movie) => movie.id == data?.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Box
        background={
          isLoading
            ? `#2d323f`
            : `url(https://image.tmdb.org/t/p/original${
                data!["backdrop_path"]
              })`
        }
        backgroundPosition={"center"}
        backgroundRepeat="no-repeat"
        position={"relative"}
        backgroundSize="cover"
        height={{ base: "100vh", sm: "60vh", xl: "75vh", "2xl": "70vh" }}
        width={"full"}
      >
        <div className="absolute inset-0 bg-black/80 z-10 "></div>
        <Box
          h="100%"
          position={"absolute"}
          zIndex={10}
          left={{ base: "0", xl: "10%" }}
          mt={{ base: "26%", sm: "25%", md: "", lg: "24%", xl: "15%" }}
          maxW="1580px"
        >
          <Flex
            h={{ base: "60%", sm: "70%", md: "80%" }}
            gap={{ md: "30px", xl: "80px" }}
            px={{ base: "30px", md: "10px" }}
          >
            <Skeleton
              w={{ md: 300, xl: 500 }}
              h={!isLoading ? "" : "100%"}
              isLoaded={!isLoading}
              startColor="#2d323f"
              endColor="#131722"
              px={{ lg: "10px" }}
              alignSelf={"center"}
              className="hidden lg:block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt={`Imagem da capa do filme ${data?.title}`}
                className="h-full"
              />
            </Skeleton>
            <Flex flexDir="column" justifyContent={"space-between"} w="100%">
              <Flex gap={{ base: "40px", sm: "20px" }} flexDir="column">
                <span className=" font-bold text-[#fffd] sm:text-xl 2xl:text-2xl">
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    width={"10%"}
                    height={isLoading ? 30 : ""}
                    className="hidden sm:block"
                  >
                    {data?.release_date.split("-")[0]}
                  </Skeleton>
                </span>
                <Heading
                  as="h1"
                  fontSize={{ base: "3xl", sm: "5xl", xl: "6xl" }}
                >
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    height={isLoading ? 50 : ""}
                    width={isLoading ? "30%" : ""}
                  >
                    {data?.title}
                  </Skeleton>
                </Heading>
                <Text
                  fontSize={{ base: "smaller", sm: "medium", md: "large" }}
                  lineHeight={{ base: "28px", xl: "34px" }}
                  color="#ddd"
                  w={"100%"}
                >
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    height={isLoading ? "120px" : ""}
                    width={
                      !isLoading
                        ? { sm: "100%", md: "95%" }
                        : { base: "75vw", sm: "50vw" }
                    }
                  >
                    {data?.overview}
                  </Skeleton>
                </Text>
                <Box
                  mt={{ base: "20px", md: "10px" }}
                  fontSize={{ base: "smaller", xl: "medium" }}
                >
                  <Skeleton
                    isLoaded={!isLoading}
                    startColor="#2d323f"
                    endColor="#131722"
                    width={isLoading ? "50%" : ""}
                    height={isLoading ? 10 : ""}
                  >
                    <UnorderedList
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "0",
                      }}
                      listStyleType={{ base: "none", md: "disc" }}
                      gap={{ base: "20px", md: "40px" }}
                      color="#aaab"
                    >
                      <ListItem style={{ listStyle: "none" }}>
                        {data?.runtime && (
                          <>
                            <span>{Math.floor(data.runtime / 60)}h </span>
                            <span>{data.runtime % 60}min</span>
                          </>
                        )}
                      </ListItem>
                      <ListItem>
                        <span>{Number(data?.release_date.split("-")[2])} </span>

                        <span>
                          de {months[Number(data?.release_date.split("-")[1])]}
                        </span>
                        <span> de {data?.release_date.split("-")[0]}</span>
                      </ListItem>
                      <ListItem>
                        {data?.genres.map(
                          (genre, index) =>
                            index < 3 && (
                              <span key={index}>
                                {genre.name}
                                {index !== data.genres.length - 1 && ", "}
                              </span>
                            )
                        )}
                      </ListItem>
                    </UnorderedList>
                  </Skeleton>
                </Box>
              </Flex>
              <Box h={{ base: "0", md: "40%", lg: "20%" }}>
                <Skeleton
                  isLoaded={!isLoading}
                  startColor="#2d323f"
                  endColor="#131722"
                  width={isLoading ? "90%" : ""}
                  height={isLoading ? 50 : "100%"}
                  mt={
                    !isLoading
                      ? { base: "30px", sm: "30px", md: "20px" }
                      : { md: "70px" }
                  }
                >
                  <Flex
                    alignItems={{
                      sm: "center",
                      md: "flex-end",
                      "2xl": "center",
                    }}
                    h="100%"
                    fontSize={{ sm: "lg", xl: "xl" }}
                    fontWeight={"bold"}
                    color="#fffd"
                    flexDir={{ base: "column", md: "row" }}
                  >
                    {data && (
                      <Flex
                        w="100%"
                        align={"center"}
                        justifyContent={{
                          base: "space-between",
                          md: "flex-start",
                        }}
                        gap={{ sm: "40px", md: "60px" }}
                      >
                        {data.homepage && (
                          <a href={data.homepage} target="_blank">
                            <Flex
                              alignItems={{ base: "flex-start", xl: "center" }}
                              gap="16px"
                              color="#23a7d7"
                              _hover={{ textDecor: "underline" }}
                            >
                              <span>Assistir o filme</span>
                              <FaExternalLinkAlt className="sm:text-xl xl:text-xl" />
                            </Flex>
                          </a>
                        )}
                        <span className="sm:text-3xl xl:text-4xl">
                          {data.vote_average.toFixed(1)}/10
                        </span>
                      </Flex>
                    )}
                    <Flex
                      mt={{ base: "30px", sm: "20px", md: "0" }}
                      gap={{ base: "10px", md: "40px" }}
                      align={"center"}
                      justifyContent={{
                        base: "space-between",
                        md: "flex-start",
                      }}
                      w={{ base: "100%", md: "auto" }}
                    >
                      <Button
                        onClick={HandleClickWatchLater}
                        colorScheme={!showWatchLaterBtn ? "gray" : "blackAlpha"}
                        _hover={
                          !showWatchLaterBtn
                            ? { color: "#000", background: "#a5a5a5" }
                            : { color: "#fff", background: "#2e2f38" }
                        }
                        as={motion.button}
                        whileTap={{ scale: 0.95 }}
                        transition="all 0.2s"
                        aria-label={
                          !showWatchLaterBtn
                            ? "Adicionar a lista de assistir mais tarde"
                            : "Remover da lista de assistir mais tarde"
                        }
                      >
                        <Collapse in={!showWatchLaterBtn}>
                          {!showWatchLaterBtn && "Assistir mais Tarde"}
                        </Collapse>
                        <Collapse in={showWatchLaterBtn}>
                          {showWatchLaterBtn && "Retirar Assistir Mais Tarde"}
                        </Collapse>
                      </Button>
                      <Button
                        onClick={HandleClickFavoriteMovie}
                        variant="ghost"
                        colorScheme="gray"
                        px={{ base: 0, md: "10px" }}
                        _hover={{ background: "#ccc2" }}
                        as={motion.button}
                        whileTap={{ scale: 0.8 }}
                        aria-label={
                          !isFavorited
                            ? "Adicionar aos favoritos"
                            : "Remover dos favoritos"
                        }
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {!isFavorited ? (
                            <motion.div
                              key="not-favorited"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon
                                as={CiHeart}
                                fontSize="4xl"
                                color="#c7c7c7"
                              />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="favorited"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Icon
                                as={FaHeart}
                                fontSize="4xl"
                                color="#e50914"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                    </Flex>
                  </Flex>
                </Skeleton>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
