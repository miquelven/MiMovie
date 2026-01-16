import { Container } from "@chakra-ui/react";

import BannerVideoDetails from "../components/Banner/BannerVideoDetails";
import CarouselVideosImages from "../components/Carousel/CarouselVideosImages";
import ReviewsArea from "../components/videoDetails/ReviewsArea";
import CreditsArea from "../components/videoDetails/CreditsArea";
import SimilarMoviesArea from "../components/videoDetails/SimilarMoviesArea";
import { useParams } from "react-router-dom";
import useGetMovieInfo from "../hooks/useGetMovieInfos";
import { Helmet } from "react-helmet";
import { useHistoryStore } from "../stores/historyStore";
import { useEffect } from "react";

export default function MovieInfo() {
  const { name } = useParams();
  const { data: movieDetails, isPending: isLoading } = useGetMovieInfo(name!);
  const addToHistory = useHistoryStore((state) => state.addToHistory);

  useEffect(() => {
    if (movieDetails?.reqBannerInfo?.data) {
      const data = movieDetails.reqBannerInfo.data;
      addToHistory({
        id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
      });
    }
  }, [movieDetails, addToHistory]);

  return (
    <>
      <Helmet>
        <title>MiMovies | {`${name?.split("-").join(" ")}`}</title>
        <meta
          name="description"
          content="Explore detalhes e informações abrangentes sobre o filme escolhido por você no MiMovies. Descubra sinopse, elenco, avaliações, trailers e muito mais para o filme selecionado. Esteja por dentro de tudo o que você precisa saber antes de assistir ao filme. Comece sua experiência cinematográfica agora e mergulhe na magia do cinema."
        ></meta>
        <meta
          name="keywords"
          content="filme, informações do filme, sinopse, elenco, avaliações, trailer, cinema, assistir filme, detalhes do filme, filme selecionado"
        ></meta>
        <meta name="author" content="MiMovies"></meta>
      </Helmet>
      <main>
        <Container maxW="100vw" p={"0"} position="relative" mb="200px">
          <BannerVideoDetails
            data={movieDetails?.reqBannerInfo.data}
            isLoading={isLoading}
          />
          <CarouselVideosImages
            videoData={movieDetails?.reqVideos.data}
            imagesData={movieDetails?.reqImages.data}
            isLoading={isLoading}
          />
          {!isLoading && (
            <>
              <Container
                mt="280px"
                maxW="1580px"
                px={{ base: "30px", md: "10px" }}
                position="relative"
              >
                {!isLoading && (
                  <ReviewsArea reviews={movieDetails?.reqReviews.data} />
                )}
                {!isLoading && (
                  <CreditsArea credits={movieDetails?.reqCredits.data} />
                )}
              </Container>
              <SimilarMoviesArea
                similarMoviesData={movieDetails?.reqSimilar.data}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
}
