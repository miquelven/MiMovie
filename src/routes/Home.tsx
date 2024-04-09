import Banner from "../components/Banner/index.tsx";
import LatestMovies from "../components/LatestMovies/index.tsx";
import VideosArea from "../components/VideosArea/index.tsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <VideosArea />
      <LatestMovies />
    </div>
  );
}
