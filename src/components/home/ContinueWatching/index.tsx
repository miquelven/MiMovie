import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { useHistoryStore } from "../../../stores/historyStore";
import LatestMoviesCard from "../LatestMovies/LatestMoviesCard";
import "../../Carousel/CarouselMovies/style.css"; // Reuse existing styles

export default function ContinueWatching() {
  const history = useHistoryStore((state) => state.history);

  if (history.length === 0) {
    return null;
  }

  return (
    <Container maxW="1580px" px={{ base: "30px", md: "10px" }} mt="80px">
      <Heading as="h2" fontSize="2xl" mb="4" color="white">
        Continuar assistindo
      </Heading>
      <Text color="gray.400" mb="6">
        Baseado no seu histórico recente
      </Text>
      <Box>
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
          loop={false}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="w-[100vw] overflow-hidden hover:cursor-grab hover:active:cursor-grabbing"
        >
          {history.map((movie, index) => (
            <SwiperSlide data-swiperSlideMovie key={movie.id}>
              <LatestMoviesCard data={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
