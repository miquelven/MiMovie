import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

interface valueType {
  genre_ids: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const setIds = (values: valueType[]) => {
  if (localStorage.getItem("genresIds")) return;
  if (values) {
    values.map((item) => {
      if (localStorage.getItem("genresIds")) {
        const idsValue = JSON.parse(localStorage.getItem("genresIds")!);
        idsValue.push(item.genre_ids);
        localStorage.setItem("genresIds", JSON.stringify(idsValue));
      } else {
        localStorage.setItem("genresIds", JSON.stringify(item.genre_ids));
      }
    });
  }
};

const getMovieData = async (url: string, page?: number) => {
  const data = await http(`${url}${page}`, options);
  setIds(data.data.results);
  return data.data;
};

const useGetMovies = (url: string, page?: number) => {
  return useQuery({
    queryKey: ["movie-data", page],
    queryFn: () => getMovieData(url, page),
  });
};

export default useGetMovies;
