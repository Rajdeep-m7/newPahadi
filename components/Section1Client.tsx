"use client";

import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export type StorefrontCategory = {
  name: string;
  slug: string;
  image: string | StaticImageData;
};

type Section1ClientProps = {
  categories: StorefrontCategory[];
};

const Section1Client = ({ categories }: Section1ClientProps) => {
  return (
    <section className="w-full px-4 py-10 md:px-0">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Shop By Category
        </h2>

        <p className="mt-2 text-gray-500">Explore our latest collections</p>
      </div>

      <div className="block md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={12}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={categories.length > 3}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.slug}>
              <Link
                href={`/category/${item.slug}`}
                className="group flex flex-col items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-md object-cover transition-all duration-300 group-hover:scale-105"
                />

                <p className="mt-2 text-center text-xs font-medium text-gray-700">
                  {item.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden flex-wrap items-center justify-around gap-4 md:flex">
        {categories.map((item) => (
          <Link
            href={`/category/${item.slug}`}
            key={item.slug}
            className="group flex cursor-pointer flex-col items-center"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={128}
              height={128}
              className="h-32 w-32 rounded-md object-cover transition-all duration-300 group-hover:scale-105"
            />

            <p className="mt-2 text-center text-base font-medium text-gray-700 transition-all duration-300 group-hover:text-amber-500">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Section1Client;
