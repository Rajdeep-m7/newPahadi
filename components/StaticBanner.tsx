"use client";

import Image from "next/image";

import pahadiImage from "@/public/PAHADI.jpg";
import image1 from "@/public/1.jpg";
import image2 from "@/public/2.jpg";

const items = [
  {
    image: pahadiImage,
  },
  {
    image: image1,
  },
  {
    image: image2,
  },
];

const StaticBanner = () => {
  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        
        {/* LEFT IMAGE */}
        <div className="group relative h-[280px] overflow-hidden rounded-3xl sm:h-[380px] lg:h-[520px] xl:h-[600px]">
          <Image
            src={items[0].image}
            alt="Banner"
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-rows-2 gap-4">
          
          {/* TOP IMAGE */}
          <div className="group relative h-[280px] overflow-hidden rounded-3xl sm:h-[300px] lg:h-[252px] xl:h-[292px]">
            <Image
              src={items[1].image}
              alt="Banner"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* BOTTOM IMAGE */}
          <div className="group relative h-[280px] overflow-hidden rounded-3xl sm:h-[300px] lg:h-[252px] xl:h-[292px]">
            <Image
              src={items[2].image}
              alt="Banner"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticBanner;