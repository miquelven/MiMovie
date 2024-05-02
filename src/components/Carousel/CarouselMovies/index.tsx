// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper/modules";
import useGetMovies from "../../../hooks/useGetMovies";

import LatestMoviesCard from "../../home/LatestMovies/LatestMoviesCard";

interface movieType {
  id: number;
  backdrop_path: string;
  title: string;
}

export default function CarouselMovies() {
  const { data, isPending } = useGetMovies(
    "movie/upcoming?language=pt-BR&page=",
    1
  );

  return (
    <>
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1275: {
            slidesPerView: 6,
          },
          1500: {
            slidesPerView: 8,
          },
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-[100vw] overflow-hidden hover:cursor-grab hover:active:cursor-grabbing"
      >
        {!isPending &&
          data &&
          data.results &&
          data.results.map((movie: movieType, index: number) => (
            <SwiperSlide data-swiperSlideMovie key={index}>
              <LatestMoviesCard data={movie} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
