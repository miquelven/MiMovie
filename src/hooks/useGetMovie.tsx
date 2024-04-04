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

const getMovieData = async (page) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`,
    options
  );
  return data.data;
};

const useGetMovie = (page) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getMovieData(page),
  });
};

export default useGetMovie;
