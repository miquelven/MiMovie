import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

interface searchMovieItem {
  id: number;
  title: string;
}

interface searchMovieType {
  results: searchMovieItem[];
}

const getSearchMovie = async (
  searchParams: string
): Promise<searchMovieType | null> => {
  const data = await http(
    `search/movie?query=${searchParams}&language=pt-BR&page=1`,
    options
  );

  return data.data;
};

const useGetSearchMovie = (searchParams: string) => {
  return useQuery({
    queryKey: ["searchVideosData", searchParams],
    queryFn: () => getSearchMovie(searchParams),
  });
};

export default useGetSearchMovie;
