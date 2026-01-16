export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export type ImageType = "poster" | "backdrop" | "profile";

export const imageSizes = {
  poster: ["w92", "w154", "w185", "w342", "w500", "w780"],
  backdrop: ["w300", "w780", "w1280"],
  profile: ["w45", "w185", "h632"],
};

export const getImageUrl = (path: string, size: string) => {
  if (!path) return "";
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};

export const generateSrcSet = (path: string, type: ImageType) => {
  if (!path) return "";
  const sizes = imageSizes[type];
  return sizes
    .map((size) => {
      if (size.startsWith("h")) return null;

      const width = `${size.replace(/\D/g, "")}w`;
      return `${getImageUrl(path, size)} ${width}`;
    })
    .filter(Boolean)
    .join(", ");
};
