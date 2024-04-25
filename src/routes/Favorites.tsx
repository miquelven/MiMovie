import { useFavoriteMoviesStore } from "../stores/favoriteStore";

export default function Favorites() {
  const favoritesMovie = useFavoriteMoviesStore((state) => state.favoriteMovie);

  return (
    <div>
      {favoritesMovie.length > 0 &&
        favoritesMovie.map((item) => <div>{item.title}</div>)}
    </div>
  );
}
