"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import accessories from "../public/accessories.avif";
import bridal from "../public/bridal-sets.avif";
import mala from "../public/mala-or-pote.avif";
import mens from "../public/men's-collections.avif";
import naugeri from "../public/naugeri.avif";
import mangalsutra from "../public/short-mangalsutra.avif";
import tihari from "../public/tilhari.avif";
import image from "../public/iamge1.avif";
import image3 from "../public/image3.avif";

import "swiper/css";

const categories = [
  {
    name: "Bridal Sets",
    image: bridal,
  },
  {
    name: "Mala-Pote",
    image: mala,
  },
  {
    name: "Tihari",
    image: tihari,
  },
  {
    name: "Naugeri",
    image: naugeri,
  },
  {
    name: "Mangalsutra",
    image: mangalsutra,
  },
  {
    name: "Men's Collections",
    image: mens,
  },
  {
    name: "Accessories",
    image: accessories,
  },
  {
    name: "Necklace",
    image: image3,
  },
  {
    name: "Others",
    image: image,
  },
];

const Section1 = () => {
  return (
    <section className="w-full py-10 px-4 md:px-0">
      
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Shop By Category
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our latest collections
        </p>
      </div>

      {/* Mobile Slider */}
      <div className="block md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={12}
          slidesPerView={3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/category/${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group flex flex-col items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-md transition-all duration-300 group-hover:scale-105"
                />

                <p className="mt-2 text-xs font-medium text-gray-700 text-center">
                  {item.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:flex flex-wrap justify-around items-center gap-4">
        {categories.map((item, index) => (
          <Link
            href={`/category/${item.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            key={index}
            className="group flex flex-col items-center cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.name}
              className="h-32 w-32 object-cover rounded-md transition-all duration-300 group-hover:scale-105"
            />

            <p className="mt-2 text-base font-medium text-gray-700 group-hover:text-amber-500 transition-all duration-300 text-center">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Section1;