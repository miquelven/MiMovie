import { useInfiniteQuery } from "@tanstack/react-query";
import http from "../helpers/http";
import movieType from "../types/movieType";

const value = import.meta.env.VITE_API_KEY;

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
  page: number;
}

const getMovieData = async (
  url: string,
  pageParam: number
): Promise<moviesType> => {
  const { data } = await http(`${url}${pageParam}`, options);
  return data;
};

const useGetMoviesInfinite = (url: string, enabled: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ["movie-data-infinite", url],
    queryFn: ({ pageParam = 1 }) => getMovieData(url, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
  });
};

export default useGetMoviesInfinite;
