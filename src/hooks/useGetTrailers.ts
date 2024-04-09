import { useQuery } from "@tanstack/react-query";

import http from "../helpers/http";

interface dataType {
  type: string;
}

const value = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

const getTrailerMovieData = async (action: string) => {
  const ids = JSON.parse(localStorage.getItem("idsForTrailers")!);
  const dataValue = [];
  switch (action) {
    case "details":
      break;
    case "home":
      for (let i = 0; i < ids.length; i++) {
        const { data } = await http(`movie/${ids[i]}/videos`, options);
        let dataTrailer = [];
        if (data) {
          dataTrailer = data.results.find((item: dataType) => {
            return item.type == "Trailer";
          });
        }
        dataValue.push(dataTrailer.key);
      }

      return dataValue;
  }
};

const useGetTrailers = (action: string) => {
  return useQuery({
    queryKey: ["trailer-data"],
    queryFn: () => getTrailerMovieData(action),
  });
};

export default useGetTrailers;
