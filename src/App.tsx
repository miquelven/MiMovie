import { useEffect, useState } from "react";
import useGetMovie from "./hooks/useGetMovie";

const baseImgUrl = "https://image.tmdb.org/t/p";
const size = "w200";

function App() {
  const { data, isPending } = useGetMovie();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (data?.results) {
      setMovieData(data.results);
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {isPending && <>Carregando</>}
      {!isPending && (
        <>
          {movieData.map((movie) => (
            <img src={`${baseImgUrl}/${size}${movie["poster_path"]}`} />
          ))}
        </>
      )}
    </>
  );
}

export default App;
