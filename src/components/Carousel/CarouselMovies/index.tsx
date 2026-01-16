import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

import { Pagination } from "swiper/modules";
import { Skeleton } from "@chakra-ui/react";
import useGetMovies from "../../../hooks/useGetMovies";

import LatestMoviesCard from "../../home/LatestMovies/LatestMoviesCard";

interface movieType {
  id: number;
  backdrop_path: string;
  title: string;
}

interface CarouselMoviesProps {
  endpoint?: string;
}

export default function CarouselMovies({
  endpoint = "movie/upcoming?language=pt-BR&page=",
}: CarouselMoviesProps) {
  const { data, isPending } = useGetMovies(endpoint, 1);

  return (
    <>
      <Skeleton
        isLoaded={!isPending}
        startColor="#2d323f"
        endColor="#131722"
        height={isPending ? 260 : "auto"}
        width="100%"
      >
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
      </Skeleton>
    </>
  );
}
