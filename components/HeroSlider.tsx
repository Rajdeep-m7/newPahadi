"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import slider1 from "../public/slider-for-pc.avif"
import slider2 from "../public/slider-for-pc-1.avif"
import slider3 from "../public/slider-for-pc-2.avif"
import slider4 from "../public/slider-for-pc-3.avif"
import slider5 from "../public/slider-for-pc-4.avif"



import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image:
      slider1,
  },
  {
    id: 2,
    image:
      slider2,
  },
  {
    id: 3,
    image:
      slider3,
  },
  {
    id: 4,
    image:
      slider4,
   
  },
  {
    id: 5,
    image:
      slider5,
  }
];

const HeroSlider = () => {
  return (
    <div className="w-full px-2 md:px-6 py-4">
      
      <Swiper
        effect="fade"
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop
        speed={1400}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="px-1 md:px-2"
          >
            <div className="relative h-87.5 md:h-120 w-full overflow-hidden rounded-3xl">
              
              {/* IMAGE */}
              <Image
                src={slide.image}
                alt="slider"
                fill
                priority
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* CONTENT */}
              <div
                className="
                  absolute inset-0
                  flex
                  items-end justify-center
                  md:items-center md:justify-end
                  p-6 md:p-16
                "
              >
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;