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

interface crewType {
  name: string;
  profile_path: string;
}

interface castType {
  name: string;
  profile_path: string;
}

interface creditsType {
  cast: castType[];
  crew: crewType[];
}

const getCreditsData = async (
  id?: number
): Promise<creditsType | undefined> => {
  let dataValue: creditsType | null = null;
  if (id) {
    const { data } = await http(`/movie/${id}/credits`, options);
    if (data !== null) {
      dataValue = data;
      return dataValue!;
    }
  }
};

const useGetCredits = (id?: number) =>
  useQuery({
    queryKey: ["data-credits"],
    queryFn: () => getCreditsData(id),
  });

export default useGetCredits;
