import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Container,
  Flex,
  Center,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import useGetMovies from "../../hooks/useGetMovies";
import { Link } from "react-router-dom";

import BannerTrailers from "./BannerTrailers";
import CarouselTrailers from "./BannerTrailers/CarouselTrailers";
import setCurrentMovie from "../../helpers/setCurrentMovie";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

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
            size="lg"
            variant="unstyled"
            _hover={{ backgroundColor: "#fff2" }}
            aria-label="left-arrow"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            size="lg"
            variant="unstyled"
            _hover={{ backgroundColor: "#fff2" }}
            aria-label="right-arrow"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
          >
            <ArrowForwardIcon />
          </IconButton>
          <Slider
            {...settings}
            ref={(slider) => setSlider(slider)}
            draggable
            autoplaySpeed={4000}
          >
            {data &&
              data.results.map(
                (movieInfo, index) =>
                  index < 3 && (
                    <>
                      <Box
                        height={"6xl"}
                        background={`url(https://image.tmdb.org/t/p/original${movieInfo["backdrop_path"]})`}
                        backgroundPosition={["left", null, "center"]}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        className="hover:cursor-grab hover:active:cursor-grabbing"
                        key={index}
                      >
                        {/* opacity */}
                        <div className="absolute inset-0 bg-black/20 z-10 "></div>
                        <div className="absolute h-[5%] w-full top-[0] bg-gradient-to-b from-[#0a0d1445] via-white/0 to-white/0 z-20"></div>
                        <div className="absolute h-[20%] w-full bottom-0 bg-gradient-to-t  from-[#0a0d14] via-[#0a0d14] to-white/0 z-50"></div>

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
                            <Flex flexDir="column" gap="40px">
                              <Heading
                                textAlign="center"
                                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                color="#eee"
                                mb="20px"
                              >
                                {movieInfo.title}
                              </Heading>
                              <Text
                                lineHeight={"32px"}
                                fontSize={{ base: "sm", xl: "lg" }}
                                width={{ base: "100%", sm: "80%" }}
                                mx="auto"
                                textAlign="center"
                                noOfLines={4}
                                color="#cfcfcf"
                              >
                                {movieInfo.overview}
                              </Text>
                            </Flex>
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
                                className="text-sm sm:text-base mb-5 text-[#cfcfcf] hover:text-[#eee] hover:underline"
                              >
                                Ver Mais Informações
                              </Link>
                              <Box opacity={{ base: 0, md: 1 }}>
                                <ArrowRightIcon style={{ rotate: "90deg" }} />
                              </Box>
                            </Flex>
                          </Center>
                        </Container>
                      </Box>
                    </>
                  )
              )}
          </Slider>
        </Box>
      </Container>
      <BannerTrailers>
        <CarouselTrailers ids={ids} />
      </BannerTrailers>
    </>
  );
}
