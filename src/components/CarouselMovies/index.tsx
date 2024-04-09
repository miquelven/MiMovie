// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper/modules";
import useGetMovies from "../../hooks/useGetMovies";
import { AspectRatio, Box, Heading, Image, Text } from "@chakra-ui/react";
import useGetGenres from "../../hooks/useGetGenres";

interface movieType {
  id: number;
  backdrop_path: string;
  title: string;
}

interface genreType {
  name: string;
}

export default function CarouselMovies() {
  const { data, isPending } = useGetMovies(
    "movie/upcoming?language=pt-BR&page=",
    1
  );

  const { data: genresData, isPending: isPendingGenres } = useGetGenres();
  return (
    <>
      <Swiper
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
        className="w-full hover:cursor-grab hover:active:cursor-grabbing"
      >
        {!isPending &&
          data.results &&
          data.results.map((movie: movieType, index: number) => (
            <SwiperSlide data-swiperSlideMovie key={movie.id}>
              <AspectRatio className="h-[300px] relative" ratio={4 / 3}>
                <>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt="naruto"
                    objectFit="cover"
                  />
                  <div className="transition-all duration-300 absolute inset-0 bg-black/60 hover:bg-black/30 ">
                    <div className="absolute bottom-10 left-0 w-full flex flex-col px-3">
                      <Heading textAlign={"center"} as="h4" fontSize={"22px"}>
                        {movie.title}
                      </Heading>
                      <Box mt="24px" height={"40px"}>
                        <div className="max-w-[75%] mx-auto grid grid-cols-2 gap-1 justify-center items-center max-sm:grid-cols-1">
                          {/* categories */}
                          {!isPendingGenres && genresData && (
                            <>
                              {genresData[index].length > 1 ? (
                                genresData[index].map(
                                  (genre: genreType, genreIndex: number) => (
                                    <Text
                                      fontWeight={"light"}
                                      textAlign={"center"}
                                      fontSize={"12px"}
                                      key={genreIndex}
                                    >
                                      {genre.name}
                                    </Text>
                                  )
                                )
                              ) : (
                                <Text
                                  fontWeight={"light"}
                                  textAlign={"center"}
                                  fontSize={"12px"}
                                  className="col-span-2"
                                >
                                  {genresData[index].name}
                                </Text>
                              )}
                            </>
                          )}
                        </div>
                      </Box>
                    </div>
                  </div>
                </>
              </AspectRatio>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
