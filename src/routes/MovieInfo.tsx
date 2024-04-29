import { Container } from "@chakra-ui/react";

import BannerVideoDetails from "../components/BannerVideoDetails";
import CarouselVideosImages from "../components/CarouselVideosImages";
import ReviewsArea from "../components/ReviewsArea";
import CreditsArea from "../components/CreditsArea";
import SimilarMoviesArea from "../components/SimilarMoviesArea";
import { useParams } from "react-router-dom";
import useGetExamples from "../hooks/useGetExample";
import useTitle from "../hooks/useTitle";

export default function MovieInfo() {
  const { name } = useParams();
  const { data: movieDetails, isPending: isLoading } = useGetExamples(name!);

  useTitle(`${name}`);

  return (
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
  );
}
