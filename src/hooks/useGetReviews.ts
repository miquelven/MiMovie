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

interface authorType {
  author: string;
  created_at: string;
  content: string;
  author_details: {
    avatar_path: string;
    rating: number;
  };
}

interface reviewType {
  results: authorType[];
}

const getReviewsData = async (id?: number): Promise<reviewType | undefined> => {
  let dataValue: reviewType | null = null;

  if (id) {
    const { data } = await http(`movie/${id}/reviews?language=pt-BR`, options);
    console.log(data);
    dataValue = data;
  }
  if (dataValue !== null) return dataValue;
};

const useGetReviews = (id?: number) => {
  return useQuery({
    queryKey: ["reviews-data"],
    queryFn: () => getReviewsData(id),
  });
};

export default useGetReviews;
