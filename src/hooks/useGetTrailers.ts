import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

interface videoDataProp {
  type: string;
  id: number;
  key: number;
  name: string;
}

interface videosDataProp {
  results: videoDataProp[];
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getTrailerMovieData = async (): Promise<videosDataProp[]> => {
  const ids = JSON.parse(localStorage.getItem("idsForTrailers")!);

  const dataArray: videosDataProp[] = [];

  for (let i = 0; i < ids.length; i++) {
    const { data } = await http(`movie/${ids[i]}/videos`, options);
    dataArray.push(data);
  }

  return dataArray;
};

const useGetTrailers = () => {
  return useQuery({
    queryKey: ["trailer-data"],
    queryFn: () => getTrailerMovieData(),
  });
};

export default useGetTrailers;
