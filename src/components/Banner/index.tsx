import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Flex,
  Center,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import Slider from "react-slick";
import useGetMovies from "../../hooks/useGetMovies";
import { Link } from "react-router-dom";

import BannerTrailers from "./BannerTrailers";
import CarouselTrailers from "./BannerTrailers/CarouselTrailers";
import setCurrentMovie from "../../helpers/setCurrentMovie";
import TmdbImage from "../ui/TmdbImage";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Banner() {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const ids = [];

  const { data, isPending } = useGetMovies(
    "movie/popular?language=pt-BR&page=",
    1
  );

  if (!isPending && data) {
    for (let i = 0; i < 3; i++) {
      ids.push(data.results[i].id);
    }
  }

  return (
    <>
      <Container maxW="100vw" p={"0"} position="relative">
        <Box
          position={"relative"}
          height="100vh"
          width={"full"}
          overflow={"hidden"}
        >
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <IconButton
            aria-label="Slide anterior"
            size="lg"
            icon={<ArrowBackIcon boxSize={6} />}
            variant="ghost"
            color="#e5e7eb"
            bg="rgba(10, 13, 20, 0.85)"
            rounded="full"
            borderWidth="1px"
            borderColor="#23a7d733"
            boxShadow="0 18px 45px rgba(5, 5, 9, 0.9)"
            backdropFilter="blur(10px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.2s ease"
            position="absolute"
            left={side}
            top={top}
            transform="translate(0%, -50%)"
            zIndex={2}
            _hover={{
              bg: "#1f9bc9",
              borderColor: "#38bdf8",
              color: "#0a0d14",
              transform: "translate(0%, -50%) scale(1.05)",
            }}
            _active={{
              bg: "#1a88b0",
              borderColor: "#23a7d7",
              transform: "translate(0%, -50%) scale(0.95)",
            }}
            onClick={() => slider?.slickPrev()}
          />
          <IconButton
            aria-label="Próximo slide"
            size="lg"
            icon={<ArrowForwardIcon boxSize={6} />}
            variant="ghost"
            color="#e5e7eb"
            bg="rgba(10, 13, 20, 0.85)"
            rounded="full"
            borderWidth="1px"
            borderColor="#23a7d733"
            boxShadow="0 18px 45px rgba(5, 5, 9, 0.9)"
            backdropFilter="blur(10px)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.2s ease"
            position="absolute"
            right={side}
            top={top}
            transform="translate(0%, -50%)"
            zIndex={2}
            _hover={{
              bg: "#1f9bc9",
              borderColor: "#38bdf8",
              color: "#0a0d14",
              transform: "translate(0%, -50%) scale(1.05)",
            }}
            _active={{
              bg: "#1a88b0",
              borderColor: "#23a7d7",
              transform: "translate(0%, -50%) scale(0.95)",
            }}
            onClick={() => slider?.slickNext()}
          />
          <Skeleton
            isLoaded={!isPending}
            startColor="#2d323f"
            endColor="#131722"
            height="100%"
            width="100%"
          >
            <Slider
              {...settings}
              ref={(slider) => setSlider(slider)}
              draggable
              autoplaySpeed={4000}
            >
              {data &&
                data.results.slice(0, 3).map((movieInfo, index) => {
                  return (
                    <MotionBox
                      height={"6xl"}
                      position="relative"
                      className="hover:cursor-grab hover:active:cursor-grabbing"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      key={movieInfo.id ?? index}
                    >
                      <TmdbImage
                        path={movieInfo["backdrop_path"]}
                        type="backdrop"
                        alt={movieInfo.title}
                        position="absolute"
                        inset="0"
                        w="full"
                        h="full"
                        objectFit="cover"
                        objectPosition={["left", null, "center"]}
                        zIndex={0}
                        sizes="100vw"
                        filter="brightness(0.25)"
                      />
                      <div className="absolute inset-0 bg-black/20 z-10 "></div>
                      <div className="absolute h-[5%] w-full top-[0] bg-gradient-to-b from-[#0a0d1445] via-white/0 to-white/0 z-20"></div>
                      <div className="absolute h-[30%] w-full bottom-0 bg-gradient-to-t from-[#050509] via-[#0a0d14] to-white/0 z-20"></div>

                      <Container
                        height="100vh"
                        px="0px !important"
                        maxWidth={["300px", "700px", null, null, "1000px"]}
                        position="relative"
                        style={{ zIndex: 20 }}
                      >
                        <Stack
                          height="400px"
                          width="100%"
                          position="absolute"
                          top="50%"
                          transform="translate(0, -50%)"
                        >
                          <MotionFlex
                            flexDir="column"
                            gap="28px"
                            align={{
                              base: "center",
                              md: "flex-start",
                            }}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              ease: "easeOut",
                              delay: 0.25,
                            }}
                          >
                            <Text
                              textTransform="uppercase"
                              letterSpacing="0.15em"
                              fontSize="xs"
                              fontWeight="bold"
                              color="#23a7d7"
                              textAlign={{ base: "center", md: "left" }}
                            >
                              Em destaque hoje
                            </Text>
                            <Heading
                              as="h2"
                              textAlign={{ base: "center", md: "left" }}
                              fontSize={{
                                base: "3xl",
                                md: "4xl",
                                lg: "5xl",
                              }}
                              color="#f9fafb"
                              mb="4px"
                            >
                              {movieInfo.title}
                            </Heading>
                            <Text
                              lineHeight={"32px"}
                              fontSize={{ base: "sm", xl: "lg" }}
                              width={{ base: "auto" }}
                              mx="auto"
                              textAlign={{ base: "left" }}
                              noOfLines={4}
                              color="#d1d5db"
                            >
                              {movieInfo.overview}
                            </Text>
                          </MotionFlex>
                        </Stack>

                        <Center
                          style={{ zIndex: 20 }}
                          position="absolute"
                          right="0"
                          left="0"
                          bottom="0"
                        >
                          <Flex
                            flexDir={"column"}
                            alignItems={"center"}
                            position={"relative"}
                            style={{ zIndex: 30 }}
                            height="100%"
                            paddingBottom={{ base: "150px", sm: "80px" }}
                          >
                            <Link
                              onClick={() => setCurrentMovie(movieInfo.id)}
                              to={`/${movieInfo.title.split(" ").join("-")}`}
                            >
                              <Box
                                as="button"
                                px={{ base: 7, md: 8 }}
                                py={{ base: 2.5, md: 3 }}
                                borderRadius="full"
                                bg="rgba(10, 13, 20, 0.9)"
                                borderWidth="1px"
                                borderColor="#23a7d733"
                                fontWeight="semibold"
                                fontSize={{ base: "xs", md: "sm" }}
                                letterSpacing="0.06em"
                                textTransform="uppercase"
                                transition="all 0.2s ease"
                                color="#e5e7eb"
                                boxShadow="0 18px 45px rgba(5, 5, 9, 0.9)"
                                backdropFilter="blur(10px)"
                                _hover={{
                                  color: "#0a0d14",
                                  bg: "#1f9bc9",
                                  borderColor: "#38bdf8",
                                  transform: "translateY(-2px)",
                                }}
                                _active={{
                                  bg: "#1a88b0",
                                  borderColor: "#23a7d7",
                                  transform: "translateY(0)",
                                }}
                              >
                                Ver detalhes
                              </Box>
                            </Link>
                          </Flex>
                        </Center>
                      </Container>
                    </MotionBox>
                  );
                })}
            </Slider>
          </Skeleton>
        </Box>
      </Container>
      <BannerTrailers>
        <CarouselTrailers ids={ids} />
      </BannerTrailers>
    </>
  );
}
