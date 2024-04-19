import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Box, Center, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
  return (
    <>
      <Heading textAlign={"center"} mt="140px" mb="80px">
        Filmes Semelhantes:
      </Heading>
      <Swiper
        style={{ overflow: "hidden", height: "600px" }}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        data-swiperTrailer
      >
        {similarMoviesData.results.map((movie) => (
          <SwiperSlide data-swiperSlideTrailer key={movie.id}>
            <Link to={`/${movie.title.split(" ").join("-")}`}>
              <Box>
                <Center>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={`Imagem do poster do filme ${movie.title}`}
                    className="transition-all duration-500 w-[53%] object-cover cursor-pointer hover:brightness-50 "
                  />
                </Center>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
