import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import http from "../helpers/http";

const value = import.meta.env.VITE_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

interface itemType {
  id: number;
}

const getExampleTest = async (movieName?: string) => {
  const movieNameParts = movieName?.split("/");
  let name = "";
  if (movieNameParts) {
    name = movieNameParts[movieNameParts.length - 1].split("-").join("%20");
  }

  const data = await http(
    `search/movie?query=${name}&language=pt-BR&page=1`,
    options
  );

  const { results } = data.data;

  const { id } = results.find(
    (item: itemType) =>
      item.id === JSON.parse(localStorage.getItem("currentMovie")!)
  );

  console.log(id);
  const reqBannerInfo = http(`movie/${id}?language=pt-BR`, options);
  const reqVideos = http(`movie/${id}/videos`, options);
  const reqImages = http(`movie/${id}/images`, options);
  const reqReviews = http(`movie/${id}/reviews?language=pt-BR`, options);
  const reqCredits = http(`movie/${id}/credits`, options);
  const reqSimilar = http(`movie/${id}/similar`, options);

  const detailsData = await axios
    .all([
      reqVideos,
      reqImages,
      reqReviews,
      reqCredits,
      reqSimilar,
      reqBannerInfo,
    ])
    .then(
      axios.spread(function (
        reqVideos,
        reqImages,
        reqReviews,
        reqCredits,
        reqSimilar,
        reqBannerInfo
      ) {
        return {
          reqVideos,
          reqImages,
          reqReviews,
          reqCredits,
          reqSimilar,
          reqBannerInfo,
        };
      })
    );
  return detailsData;
};

const useGetExamples = (movieName: string) => {
  return useQuery({
    queryKey: ["example-data", movieName],
    queryFn: () => getExampleTest(movieName),
  });
};

export default useGetExamples;
