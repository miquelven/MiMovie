import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";
import movieType from "../types/movieType";

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

interface moviesType {
  results: movieType[];
  total_pages: number;
}

const getMovieData = async (
  url: string,
  page?: number
): Promise<moviesType | undefined> => {
  let dataValue: moviesType | null = null;
  const data = await http(`${url}${page}`, options);

  if (data !== null) {
    dataValue = data.data;
    const genresData: number[][] = [];
    data.data.results.map((item: itemType) => {
      genresData.push(item.genre_ids);
    });
    localStorage.setItem("genresIds", JSON.stringify(genresData));
  }

  return dataValue!;
};

const useGetMovies = (
  url: string,
  page?: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["movie-data", url, page],
    queryFn: () => getMovieData(url, page),
    enabled: options?.enabled,
  });
};

export default useGetMovies;
