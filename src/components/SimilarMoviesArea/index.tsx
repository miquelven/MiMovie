import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Box, Center, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
}
interface propType {
  similarMoviesData: {
    results: movieType[];
  };
}

export default function SimilarMoviesArea({ similarMoviesData }: propType) {
  const [currentMovieId, setCurrentMovieId] = useLocalStorage(
    "currentMovie",
    0
  );

  console.log(currentMovieId);

  return (
    <Container maxW="1580px" px={{ base: "0", md: "10px" }}>
      <Heading textAlign={"center"} mt="140px" mb={{ base: "0", md: "40px" }}>
        Filmes Semelhantes:
      </Heading>
      <Swiper
        style={{ overflow: "hidden" }}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        data-swiperTrailer
      >
        {similarMoviesData.results.map((movie) => (
          <SwiperSlide
            style={{ height: "100%", width: "100%" }}
            data-swiperSlideTrailer
            key={movie.id}
          >
            <Center h="100%">
              <Link
                onClick={() => {
                  setCurrentMovieId(movie.id);
                }}
                to={`/${movie.title.split(" ").join("-")}`}
              >
                <Box>
                  <Center>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                      alt={`Imagem do poster do filme ${movie.title}`}
                      className="transition-all duration-500 w-[64%] object-cover cursor-pointer hover:brightness-50 "
                    />
                  </Center>
                </Box>
              </Link>
            </Center>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
