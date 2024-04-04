import { useState } from "react";
import useGetMovie from "./hooks/useGetMovie";
import Pagination from "./components/pagination";

const baseImgUrl = "https://image.tmdb.org/t/p";
const size = "w200";

function App() {
  const [pageSelected, setPageSelected] = useState(1);
  const { data, isPending } = useGetMovie(pageSelected);

  const setPage = (value) => {
    setPageSelected(value);
  };

  return (
    <>
      <Pagination infos={{ isPending, setPage, pageSelected }} />

      {isPending ? (
        <>Carregando</>
      ) : (
        <>
          {data.results.map((movie) => (
            <div key={movie.key}>
              <img src={`${baseImgUrl}/${size}${movie["poster_path"]}`} />
              <p>{movie.title}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default App;
