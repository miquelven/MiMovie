import { create } from "zustand";
import { persist } from "zustand/middleware";

interface movieType {
  poster_path: string;
  title: string;
  id: number;
  vote_average?: number;
  release_date?: string;
  popularity?: number;
}

interface favoriteMovieIdStore {
  favoriteMovie: movieType[];
  addFavorites: (movie: movieType) => void;
  removefavoriteMovie: (movieId: number) => void;
}

export const useFavoriteMoviesStore = create<favoriteMovieIdStore>()(
  persist(
    (set) => ({
      favoriteMovie: [],
      addFavorites: (movie) =>
        set((state) => ({
          favoriteMovie: [...state.favoriteMovie, movie],
        })),
      removefavoriteMovie: (movieId) =>
        set((state) => ({
          favoriteMovie: state.favoriteMovie.filter(
            (mId) => mId.id !== movieId
          ),
        })),
    }),
    {
      name: "favoriteMovie store",
    }
  )
);
