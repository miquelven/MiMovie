import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Box, Skeleton } from "@chakra-ui/react";

interface videoDataProp {
  type: string;
  id: number;
  key: number;
  name: string;
}

interface imageDataProp {
  file_path: string;
}

interface videosDataProp {
  results: videoDataProp[];
}

interface imagesDataProp {
  backdrops: imageDataProp[];
}

interface propType {
  videoData: videosDataProp[];
  isLoadingVideo: boolean;
  isLoadingImage: boolean;
  imagesData: imagesDataProp;
}

export default function CarouselVideosImages({
  videoData,
  isLoadingVideo,
  isLoadingImage,
  imagesData,
}: propType) {
  let videos: videoDataProp[] | null = null;
  if (!isLoadingVideo) {
    videos = videoData[0].results.filter((video) => video.type == "Trailer");
  }

  const images = [];
  if (!isLoadingImage) {
    for (let i = 0; i < imagesData.backdrops.length; i++) {
      images.push(imagesData.backdrops[i].file_path);
    }
  }

  return (
    <Box mt="280px" mb="200px">
      <Skeleton
        isLoaded={!isLoadingVideo && !isLoadingImage}
        startColor="#2d323f"
        endColor="#131722"
        height={isLoadingVideo && isLoadingImage ? 300 : ""}
        width="100%"
      >
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {videos &&
            videos.map((video) => (
              <SwiperSlide key={video.id} className="h-[300px] ">
                <iframe
                  key={video.key}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  height={"280px"}
                  width={"100%"}
                  title={`${video.name}`}
                  allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture; 
              web-share"
                ></iframe>
              </SwiperSlide>
            ))}
          {images &&
            images.map(
              (image, index) =>
                index < 10 && (
                  <SwiperSlide key={index}>
                    <Skeleton
                      isLoaded={!isLoadingImage}
                      startColor="#2d323f"
                      endColor="#131722"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${image}`}
                        alt="object-cover"
                      />
                    </Skeleton>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      </Skeleton>
    </Box>
  );
}
