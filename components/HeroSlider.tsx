"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import slider1 from "../public/slider-for-pc.avif";
import slider2 from "../public/slider-for-pc-1.avif";
import slider3 from "../public/slider-for-pc-2.avif";
import slider4 from "../public/slider-for-pc-3.avif";
import slider5 from "../public/slider-for-pc-4.avif";

import mobile1 from "../public/mobile slide1.avif";
import mobile2 from "../public/mobile slide2.avif";
import mobile3 from "../public/mobile slide3.avif";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    desktop: slider1,
    mobile: mobile1,
  },
  {
    id: 2,
    desktop: slider2,
    mobile: mobile2,
  },
  {
    id: 3,
    desktop: slider3,
    mobile: mobile3,
  },
  {
    id: 4,
    desktop: slider4,
    mobile: mobile1,
  },
  {
    id: 5,
    desktop: slider5,
    mobile: mobile2,
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full pb-1">
      <Swiper
        effect="fade"
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
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
          <SwiperSlide key={slide.id}>
            <div className="relative h-87.5 md:h-130 w-full overflow-hidden rounded-3xl">
              
              {/* Desktop Image */}
              <Image
                src={slide.desktop}
                alt={`slide-${slide.id}`}
                fill
                priority
                className="hidden md:block object-cover"
              />

              {/* Mobile Image */}
              <Image
                src={slide.mobile}
                alt={`slide-${slide.id}`}
                fill
                priority
                className="block md:hidden object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div
                className="
                  absolute inset-0
                  flex
                  items-end justify-center
                  md:items-center md:justify-end
                  p-6 md:p-16
                "
              >
                {/* Add your text/buttons here */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;