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
    <Box
      mt={{
        base: "140px",
        sm: "270px",
        md: "180px",
        lg: "330px",
        xl: "200px",
        "2xl": "280px",
      }}
      mb={{ base: "150px", md: "200px" }}
    >
      <Skeleton
        isLoaded={!isLoadingVideo && !isLoadingImage}
        startColor="#2d323f"
        endColor="#131722"
        height={isLoadingVideo && isLoadingImage ? 300 : ""}
        width="100%"
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="h-[200px] w-[90%] sm:w-full sm:h-[250px] 2xl:h-[300px] "
        >
          {videos &&
            videos.map((video) => (
              <SwiperSlide key={video.id} style={{ height: "100%" }}>
                <iframe
                  key={video.key}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={`${video.name}`}
                  className="h-full w-full"
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
                index < 6 && (
                  <SwiperSlide
                    key={index}
                    style={{
                      background: `url('https://image.tmdb.org/t/p/original${image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      height: "100%",
                    }}
                  ></SwiperSlide>
                )
            )}
        </Swiper>
      </Skeleton>
    </Box>
  );
}
