import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

interface itemType {
  id: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getGenre = async () => {
  const data = await http("genre/movie/list?language=pt-BR", options);
  const genres = [];
  const genreIds = JSON.parse(localStorage.getItem("genresIds")!);
  for (let i = 0; i < genreIds.length; i++) {
    if (genreIds[i].length == undefined) {
      genres.push(
        data.data.genres.find((item: itemType) => {
          return item.id == genreIds[i];
        })
      );
    } else {
      const values: number[] = [];
      genreIds[i].map((genre: number) => {
        // genres.push(
        values.push(
          data.data.genres.find((item: itemType) => {
            return item.id == genre;
          })
        );
        // );
      });
      genres.push(values);
    }
  }
  return genres;
};

const useGetGenres = () => {
  return useQuery({
    queryKey: ["genre"],
    queryFn: () => getGenre(),
  });
};

export default useGetGenres;
