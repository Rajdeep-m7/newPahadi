"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
];

const VideoSlider = () => {
  return (
    <section className="w-full py-12">
      {/* HEADING */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Trending Videos
        </h2>

        <p className="mt-2 text-gray-500">
          Watch our latest jewellery collections
        </p>
      </div>

      {/* SLIDER */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        grabCursor={true}
        slidesPerView={2.2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          1024: {
            slidesPerView: 4.5,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className="w-full"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                draggable={false}
                preload="metadata"
                className="pointer-events-none h-65 w-full object-cover md:h-115"
              >
                <source
                  src={video}
                  type="video/mp4"
                />
              </video>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VideoSlider;