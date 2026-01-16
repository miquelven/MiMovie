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

const getPersonInfo = async (id: string) => {
  const reqDetails = await http(`person/${id}?language=pt-BR`, options);
  return reqDetails.data;
};

const useGetPersonInfo = (id: string) => {
  return useQuery({
    queryKey: ["personInfo", id],
    queryFn: () => getPersonInfo(id),
    enabled: !!id,
  });
};

export default useGetPersonInfo;
