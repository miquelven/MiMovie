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

const getAllGenres = async () => {
  const data = await http("genre/movie/list?language=pt-BR", options);

  return data.data;
};

const useGetAllGenres = () => {
  return useQuery({
    queryKey: ["Allgenres"],
    queryFn: () => getAllGenres(),
  });
};

export default useGetAllGenres;
