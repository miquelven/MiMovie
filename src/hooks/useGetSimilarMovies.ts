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

const getSimilarMovies = async (id: number) => {
  const { data } = await http(`movie/${id}/similar`, options);
  return data;
};

const useGetSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ["data-similarMovies"],
    queryFn: () => getSimilarMovies(id),
  });

export default useGetSimilarMovies;
