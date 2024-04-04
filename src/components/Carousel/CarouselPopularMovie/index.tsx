import usePopularMovieData from "../../../hooks/usePopularMovieData";

const baseImgUrl = "https://image.tmdb.org/t/p";
const size = "w200";

export default function CarouselPopularMovie() {
  const { data, isError, isPending } = usePopularMovieData(1);

  return (
    <div>
      {isError && <>Erro ao obter os dados</>}
      {!isPending && (
        <>
          {data.results.map((movie) => (
            <div key={movie.key}>
              <img src={`${baseImgUrl}/${size}${movie["poster_path"]}`} />
              <p>{movie.title}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
