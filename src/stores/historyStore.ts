import { create } from "zustand";
import { persist } from "zustand/middleware";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average?: number;
}

interface historyStoreType {
  history: movieType[];
  addToHistory: (movie: movieType) => void;
  removeFromHistory: (movieId: number) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<historyStoreType>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (movie) =>
        set((state) => {
          // Remove if already exists to move it to the end (most recent)
          const filtered = state.history.filter((m) => m.id !== movie.id);
          // Keep only last 20 items
          const newHistory = [movie, ...filtered].slice(0, 20);
          return { history: newHistory };
        }),
      removeFromHistory: (movieId) =>
        set((state) => ({
          history: state.history.filter((m) => m.id !== movieId),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "history-storage",
    }
  )
);
