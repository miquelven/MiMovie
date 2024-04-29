import Banner from "../components/Banner/index.tsx";
import LatestMovies from "../components/LatestMovies/index.tsx";
import FeaturesArea from "../components/FeaturesArea/index.tsx";
import PopularMovies from "../components/PopularMovies/index.tsx";
import useTitle from "../hooks/useTitle.tsx";

export default function Home() {
  useTitle("Home");

  return (
    <main className="relative">
      <Banner />

      <LatestMovies />
      <FeaturesArea />
      <PopularMovies />
    </main>
  );
}
