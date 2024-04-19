import { useQuery } from "@tanstack/react-query";
import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

const options = {
  methods: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

interface movieType {
  id: number;
  title: string;
  poster_path: string;
}
interface similarMovieType {
  results: movieType[];
}

const getSimilarMovies = async (
  id: number
): Promise<similarMovieType | undefined> => {
  let dataValue: similarMovieType | null = null;
  const { data } = await http(`movie/${id}/similar`, options);
  if (data !== null) {
    dataValue = data;
  }
  return dataValue!;
};

const useGetSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ["data-similarMovies"],
    queryFn: () => getSimilarMovies(id),
  });

export default useGetSimilarMovies;
