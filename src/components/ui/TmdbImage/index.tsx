import { Image, ImageProps } from "@chakra-ui/react";
import { generateSrcSet, getImageUrl, ImageType } from "../../../helpers/tmdbImageHelper";

interface TmdbImageProps extends ImageProps {
  path: string;
  type: ImageType;
  alt: string;
  sizes?: string; // e.g. "(max-width: 768px) 100vw, 50vw"
  className?: string;
  fallbackSrc?: string;
}

export default function TmdbImage({
  path,
  type,
  alt,
  sizes,
  fallbackSrc,
  ...props
}: TmdbImageProps) {
  // Default fallback if path is missing
  if (!path) {
    return (
      <Image
        src={fallbackSrc || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={alt}
        loading="lazy"
        decoding="async"
        objectFit="cover"
        {...props}
      />
    );
  }

  // Choose a default src (medium size)
  const defaultSize =
    type === "poster" ? "w500" : type === "backdrop" ? "w780" : "w185";
  const src = getImageUrl(path, defaultSize);
  const srcSet = generateSrcSet(path, type);

  // Default sizes if not provided
  const defaultSizes =
    type === "poster"
      ? "(max-width: 500px) 50vw, (max-width: 1200px) 33vw, 20vw" // Approximate
      : type === "backdrop"
      ? "100vw"
      : "150px";

  return (
    <Image
      src={src}
      srcSet={srcSet}
      sizes={sizes || defaultSizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      objectFit="cover"
      {...props}
    />
  );
}
