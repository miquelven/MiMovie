import { Container } from "@chakra-ui/react";
import useGetMoviesDetail from "../hooks/useGetMovieDetails";

import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
// import useGetVideos from "../hooks/useGetVideos";
// import useGetTrailers from "../hooks/useGetTrailers";
import BannerVideoDetails from "../components/BannerVideoDetails";

export default function MovieInfo() {
  const [videoId, setVideoId] = useLocalStorage<number[]>("idsForTrailers", []);
  const { data, isPending } = useGetMoviesDetail();

  useEffect(() => {
    if (!isPending && data !== undefined) setVideoId([data.id]);
    console.log(videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  // const { data: videosData, isPending: isPendingVideos } =
  //   useGetTrailers(videoId);

  return (
    <main>
      <Container maxW="100vw" p={"0"} position="relative">
        {!isPending && data && <BannerVideoDetails data={data} />}
      </Container>
    </main>
  );
}
