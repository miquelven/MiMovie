import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const value = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getPopularMovieData = async (page: number) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`,
    options
  );
  console.log(data);
  return data.data;
};

const usePopularMovieData = (page: number) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getPopularMovieData(page),
  });
};

export default usePopularMovieData;
