import { create } from "zustand";
import { persist } from "zustand/middleware";

interface movieType {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average?: number;
  release_date?: string;
  popularity?: number;
}

interface watchLaterType {
  watchLaterMovie: movieType[];
  addWatchLater: (movie: movieType) => void;
  removeWatchLater: (movieId: number) => void;
}

export const useWatchLaterStore = create<watchLaterType>()(
  persist(
    (set) => ({
      watchLaterMovie: [],
      addWatchLater: (movie) =>
        set((state) => ({
          watchLaterMovie: [...state.watchLaterMovie, movie],
        })),
      removeWatchLater: (movieId) =>
        set((state) => ({
          watchLaterMovie: state.watchLaterMovie.filter(
            (mId) => mId.id !== movieId
          ),
        })),
    }),
    {
      name: "watchLater store",
    }
  )
);
