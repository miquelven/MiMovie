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

interface movieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
}

interface moviesType {
  results: movieType[];
}

const getMovieData = async (
  url: string,
  page?: number
): Promise<moviesType | undefined> => {
  let dataValue: moviesType | null = null;
  const data = await http(`${url}${page}`, options);

  if (data !== null) {
    dataValue = data.data;
    // setLocalStorage genreIds value
    const genresData: number[][] = [];
    data.data.results.map((item: itemType) => {
      genresData.push(item.genre_ids);
    });
    localStorage.setItem("genresIds", JSON.stringify(genresData));
  }

  return dataValue!;
};

const useGetMovies = (url: string, page?: number) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getMovieData(url, page),
  });
};

export default useGetMovies;
