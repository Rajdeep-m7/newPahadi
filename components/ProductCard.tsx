"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
};

const ProductCard = ({
  image,
  title,
  price,
  oldPrice,
  discount,
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group w-full min-w-0 overflow-hidden rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl">

      {/* IMAGE SECTION */}
      <Link href="/product" className="relative block overflow-hidden rounded-t-xl">

        <Image
          src={image}
          alt={title} 
          width={500}
          height={600}
          className="h-50 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-65 md:h-70"
        />

        <div className="absolute inset-0 bg-black/5 opacity-0 transition-all duration-300 group-hover:opacity-100" />

        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md"
        >
          {wishlisted ? (
            <IoHeart className="text-2xl text-red-500" />
          ) : (
            <IoHeartOutline className="text-2xl text-gray-700" />
          )}
        </button>

        <div className="absolute bottom-4 left-1/2 hidden w-[88%] -translate-x-1/2 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">

          <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b98b5f] py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#a67a52]">

            <FiShoppingBag className="text-xl" />

            Quick Add
          </button>
        </div>
      </Link>

      <div className="p-3">

        <h3 className="truncate text-sm font-semibold text-[#5f4339] sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          22KT Gold Jewellery
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">

          <p className="text-base font-bold text-[#5f4339] sm:text-xl">
            {price}
          </p>

          {oldPrice && (
            <p className="text-xs text-gray-400 line-through sm:text-base">
              {oldPrice}
            </p>
          )}

          {discount && (
            <p className="text-xs font-semibold text-green-600">
              {discount}
            </p>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#b98b5f] py-2 text-sm font-semibold text-white md:hidden">

          <FiShoppingBag className="text-lg" />

          Quick Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;