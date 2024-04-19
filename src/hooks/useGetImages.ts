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

const getImages = async (id?: number) => {
  if (id) {
    const { data } = await http(`movie/${id}/images`, options);

    return data;
  }
};

const useGetImages = (id?: number) => {
  return useQuery({
    queryKey: ["images-data"],
    queryFn: () => getImages(id),
  });
};

export default useGetImages;
