// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { EffectFlip, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./style.css";
import useGetTrailers from "../../../../hooks/useGetTrailers";

interface typeProp {
  ids: number[];
}

export default function CarouselTrailers({ ids }: typeProp) {
  console.log(ids);
  const { data, isPending } = useGetTrailers(ids);

  if (!isPending) console.log(data);

  return (
    <>
      <Swiper
        style={{ overflow: "hidden" }}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        modules={[EffectFlip, Navigation]}
        data-swiperTrailer
      >
        {!isPending &&
          data &&
          data.map((itemData, index) => (
            <SwiperSlide data-swiperSlideTrailer key={index}>
              {itemData.results.map(
                (item) =>
                  item.type == "Trailer" && (
                    <iframe
                      key={item.key}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      allow="accelerometer; 
                    autoplay; 
                    clipboard-write; 
                    encrypted-media; 
                    gyroscope; 
                    picture-in-picture; 
                    web-share"
                    ></iframe>
                  )
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
