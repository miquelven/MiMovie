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

const getTrailerMovieData = async (action: string, id?: number[]) => {
  const ids = JSON.parse(localStorage.getItem("idsForTrailers")!);
  const dataValue = [];
  switch (action) {
    case "details":
      break;
    case "home":
      for (let i = 0; i < ids.length; i++) {
        const { data } = await http(`movie/${ids[i]}/videos`, options);
        const dataTrailer = data.results.find((item) => {
          return item.type == "Trailer";
        });

        dataValue.push(dataTrailer.key);
      }

      return dataValue;
  }
};

const useGetTrailers = (action: string, id?: number[]) => {
  return useQuery({
    queryKey: ["trailer-data"],
    queryFn: () => getTrailerMovieData(action, id),
  });
};

export default useGetTrailers;
