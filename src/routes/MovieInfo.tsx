import { Container } from "@chakra-ui/react";
import useGetMoviesDetail from "../hooks/useGetMovieDetails";

import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import BannerVideoDetails from "../components/BannerVideoDetails";
import CarouselVideosImages from "../components/CarouselVideosImages";
import useGetTrailers from "../hooks/useGetTrailers";
import useGetImages from "../hooks/useGetImages";
import useGetReviews from "../hooks/useGetReviews";
import ReviewsArea from "../components/ReviewsArea";
import useGetCredits from "../hooks/useGetCredits";
import CreditsArea from "../components/CreditsArea";
import useGetSimilarMovies from "../hooks/useGetSimilarMovies";
import SimilarMoviesArea from "../components/SimilarMoviesArea";

export default function MovieInfo() {
  const [videoId, setVideoId] = useLocalStorage<number[]>("idsForTrailers", []);
  const { data, isPending } = useGetMoviesDetail();

  useEffect(() => {
    if (!isPending && data !== undefined) setVideoId([data.id]);
    console.log(videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const { data: videosData, isPending: isPendingVideos } = useGetTrailers();
  const { data: imagesData, isPending: isPendingImages } = useGetImages(
    videoId[0]
  );
  const { data: reviewsData, isPending: isPendingReviews } = useGetReviews(
    videoId[0]
  );
  const { data: creditsData, isPending: isPendingCredits } = useGetCredits(
    videoId[0]
  );
  const { data: similarMoviesData, isPending: isPendingSimilar } =
    useGetSimilarMovies(videoId[0]);

  return (
    <main>
      <Container maxW="100vw" p={"0"} position="relative" mb="200px">
        <BannerVideoDetails data={data} isLoading={isPending} />
        <Container
          mt="280px"
          maxW="1580px"
          px={{ base: "30px", md: "10px" }}
          position="relative"
        >
          <CarouselVideosImages
            videoData={videosData!}
            isLoadingVideo={isPendingVideos}
            imagesData={imagesData}
            isLoadingImage={isPendingImages}
          />
          {!isPendingReviews && <ReviewsArea reviews={reviewsData!} />}
          {!isPendingCredits && <CreditsArea credits={creditsData!} />}
          {!isPendingSimilar && (
            <SimilarMoviesArea similarMoviesData={similarMoviesData!} />
          )}
        </Container>
      </Container>
    </main>
  );
}
