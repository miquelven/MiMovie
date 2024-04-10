import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

interface itemType {
  genre_ids: number[];
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getMovieData = async (url: string, page?: number) => {
  const data = await http(`${url}${page}`, options);

  // setLocalStorage genreIds value
  const genresData: number[][] = [];
  data.data.results.map((item: itemType) => {
    genresData.push(item.genre_ids);
  });
  localStorage.setItem("genresIds", JSON.stringify(genresData));

  return data.data;
};

const useGetMovies = (url: string, page?: number) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getMovieData(url, page),
  });
};

export default useGetMovies;
