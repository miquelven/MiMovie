import Banner from "../components/Banner/index.tsx";
import LatestMovies from "../components/home/LatestMovies/index.tsx";
import FeaturesArea from "../components/home/FeaturesArea/index.tsx";
import PopularMovies from "../components/home/PopularMovies/index.tsx";
import TrendingMovies from "../components/home/TrendingMovies/index.tsx";
import { Helmet } from "react-helmet";
import ContactArea from "../components/home/ContactArea/index.tsx";
import ContinueWatching from "../components/home/ContinueWatching/index.tsx";
import ForYou from "../components/home/ForYou/index.tsx";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MiMovies | Home</title>
        <meta
          name="description"
          content="Descubra uma vasta coleção de filmes para assistir no MiMovies. Explore uma variedade de gêneros, desde ação até romance, e encontre os filmes perfeitos para cada ocasião. Mantenha-se atualizado com as últimas estreias e descubra clássicos atemporais. Comece sua jornada cinematográfica hoje mesmo e transforme suas noites em verdadeiras sessões de cinema."
        ></meta>
        <meta
          name="keywords"
          content="filmes, assistir filmes, cinema, filmes online, streaming, entretenimento, lançamentos, clássicos, coleção de filmes, filmes para assistir"
        ></meta>
        <meta name="author" content="MiMovies"></meta>
      </Helmet>
      <main className="relative">
        <Banner />
        <ContinueWatching />
        <ForYou />
        <LatestMovies />
        <TrendingMovies />
        <FeaturesArea />
        <PopularMovies />
        <ContactArea />
      </main>
    </>
  );
}
