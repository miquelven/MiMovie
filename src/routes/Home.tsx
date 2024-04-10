import Banner from "../components/Banner/index.tsx";
import LatestMovies from "../components/LatestMovies/index.tsx";
import VideosArea from "../components/VideosArea/index.tsx";
import FeaturesArea from "../components/FeaturesArea/index.tsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <VideosArea />
      <LatestMovies />
      <FeaturesArea />
    </div>
  );
}
