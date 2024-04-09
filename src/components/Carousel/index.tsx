// import usePopularMovieData from "../../hooks/useGetMovies";
// import movieType from "../../types/movieType";

// const baseImgUrl = "https://image.tmdb.org/t/p";
// const size = "w200";

// export default function CarouselPopularMovie() {
//   const { data, isError, isPending } = usePopularMovieData(1);

//   return (
//     <div>
//       {isError && <>Erro ao obter os dados</>}
//       {!isPending && (
//         <>
//           {JSON.stringify(data.results)}
//           {data.results.map((movie: movieType) => (
//             <div key={movie.id}>
//               <img src={`${baseImgUrl}/${size}${movie["poster_path"]}`} />
//               <p>{movie.title}</p>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }
