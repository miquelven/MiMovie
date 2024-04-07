import { motion } from "framer-motion";

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
  Link,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import useGetMovies from "../../hooks/useGetMovies";
import { useNavigate } from "react-router-dom";

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

export default function CaptionCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const { data, isPending } = useGetMovies(
    "movie/popular?language=pt-BR&page=",
    1
  );

  const navigate = useNavigate();

  return (
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
          {!isPending &&
            [0, 1, 2].map((vIndex) => (
              <>
                <Box
                  height={"6xl"}
                  position="relative"
                  background={`url(https://image.tmdb.org/t/p/original${data.results[vIndex]["backdrop_path"]})`}
                  backgroundPosition={["left", null, "center"]}
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  className="hover:cursor-grab hover:active:cursor-grabbing"
                  key={vIndex}
                >
                  {/* opacity */}
                  <div className="absolute inset-0 bg-black/70 z-10 "></div>
                  <div className="absolute h-[5%] w-full top-0 bg-gradient-to-b from-[#131722] via-white/0 to-white/0 z-20"></div>
                  <div className="absolute h-[10%] w-full top-[76%] bg-gradient-to-t  from-[#0a0d14] via-white/0 to-white/0 z-20"></div>
                  <Container
                    height="600px"
                    px="0px !important"
                    maxWidth={["300px", "700px", null, null, "1000px"]}
                    // width={{ md: "800px", lg: "1000px" }}
                    position="relative"
                    style={{ zIndex: 20 }}
                  >
                    <Stack
                      height="400px"
                      width="100%"
                      position="absolute"
                      top="70%"
                      transform="translate(0, -50%)"
                    >
                      <Flex flexDir="column" gap="40px">
                        <Heading
                          textAlign="center"
                          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                          color="#eee"
                          mb="20px"
                        >
                          {data.results[vIndex].title}
                        </Heading>
                        <Text
                          lineHeight={"32px"}
                          fontSize={{ sm: "md", xl: "lg" }}
                          textAlign="center"
                          noOfLines={4}
                          color="#cfcfcf"
                        >
                          {data.results[vIndex].overview}
                        </Text>
                      </Flex>
                    </Stack>
                  </Container>
                  {/* rating */}
                  <Center
                    style={{ zIndex: 20 }}
                    position="absolute"
                    right="0"
                    left="0"
                    top="60%"
                  >
                    <Flex flexDir={"column"} alignItems={"center"}>
                      <Button
                        variant="unstyled"
                        onClick={() =>
                          navigate(`movie/${data.results[vIndex].id}`)
                        }
                      >
                        <Link
                          mt="30px"
                          color="#cfcfcf"
                          _hover={{
                            color: "#eee",
                            textDecoration: "underline",
                          }}
                        >
                          Ver Mais Informações
                        </Link>
                      </Button>
                      <motion.div
                        whileInView={{ marginTop: "10px" }}
                        transition={{
                          duration: 1,
                          ease: "circIn",
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <ArrowRightIcon style={{ rotate: "90deg" }} />
                      </motion.div>
                    </Flex>
                  </Center>
                </Box>
              </>
            ))}
        </Slider>
      </Box>
    </Container>
  );
}
