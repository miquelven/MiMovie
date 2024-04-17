import { useQuery } from "@tanstack/react-query";

interface companieProp {
  id: number;
  logo_path: string;
  name: string;
}

interface genreProp {
  name: string;
}

interface dataProp {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  genres: genreProp[];
  runtime: number;
  homepage: string;
  vote_average: number;
  production_companies: companieProp[];
  isPending: boolean;
}

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getMovieDetail = async (): Promise<dataProp | undefined> => {
  const urlActual = window.location.href;
  const urlParts = urlActual.split("/");
  const movieName = urlParts[urlParts.length - 1].split("-").join("%20");

  try {
    const data = await http(
      `search/movie?query=${movieName}&language=pt-BR&page=1`,
      options
    );

    const dataMovieDetail = await http(
      `movie/${data.data.results[0].id}?language=pt-BR`,
      options
    );

    return dataMovieDetail.data;
  } catch (e) {
    console.log("errro" + e);
  }
};

const useGetMoviesDetail = () => {
  return useQuery({
    queryKey: ["movie-detail"],
    queryFn: () => getMovieDetail(),
  });
};

export default useGetMoviesDetail;
