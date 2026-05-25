"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
];

const VideoSlider = () => {
  return (
    <section className="w-full px-4 md:px-4 py-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Trending Videos
        </h2>

        <p className="text-gray-500 mt-2">
          Watch our latest jewellery collections
        </p>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        grabCursor={true}
        slidesPerView={2}
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
            <div className="overflow-hidden rounded-md bg-black">
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                draggable={false}
                className="h-65 md:h-115 w-full object-cover pointer-events-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VideoSlider;
