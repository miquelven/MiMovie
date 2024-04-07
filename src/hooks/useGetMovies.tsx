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

const getPopularMovieData = async (url: string, page?: number) => {
  const data = await http(`${url}${page}`, options);
  console.log(data);
  return data.data;
};

const useGetMovies = (url: string, page?: number) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getPopularMovieData(url, page),
  });
};

export default useGetMovies;
