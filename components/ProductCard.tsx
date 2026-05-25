"use client";

import { useState } from "react";

import Image from "next/image";

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
    <div className="group w-72 overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      
      <div className="relative overflow-hidden rounded-t-xl">
        
        <Image
          src={image}
          alt={title}
          width={500}
          height={600}
          className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        <div className="absolute bottom-4 left-1/2 w-[88%] -translate-x-1/2 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          
          <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b98b5f] py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#a67a52]">
            
            <FiShoppingBag className="text-xl" />

            Quick Add
          </button>
        </div>
      </div>
      <div className="p-5">
        
        <h3 className="truncate text-xl font-semibold text-[#5f4339]">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          22KT Gold Jewellery
        </p>
        <div className="mt-4 flex items-center gap-3">
          
          <p className="text-2xl font-bold text-[#5f4339]">
            {price}
          </p>

          {oldPrice && (
            <p className="text-lg text-gray-400 line-through">
              {oldPrice}
            </p>
          )}

          {discount && (
            <p className="text-sm font-semibold text-green-600">
              {discount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;