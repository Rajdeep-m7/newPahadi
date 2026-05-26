"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const ProductPage = () => {
  const productImages = [
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602752250015-52934bc45613?q=80&w=1200&auto=format&fit=crop",
  ];

  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <section className="px-3 py-3 lg:px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[520px_1fr]">
        
        {/* LEFT SIDE */}
        <div>

          {/* MOBILE UI */}
          <div className="lg:hidden">
            
            {/* SMALL MAIN IMAGE */}
            <div className="mx-auto w-[82%] overflow-hidden rounded-3xl bg-white shadow-sm">
              <Image
                src={mainImage}
                alt="Product"
                width={700}
                height={700}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* MOBILE THUMBNAILS */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`overflow-hidden rounded-lg border bg-white ${
                    mainImage === img
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={52}
                    height={52}
                    className="h-12.5 w-12.5 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DESKTOP UI */}
          <div className="hidden gap-3 lg:flex">
            
            {/* LEFT THUMBNAILS */}
            <div className="flex w-18 flex-col gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`overflow-hidden rounded-xl border bg-white transition ${
                    mainImage === img
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    width={70}
                    height={70}
                    className="h-17 w-17 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1">
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <Image
                  src={mainImage}
                  alt="Product"
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* DESKTOP BUTTONS */}
              <div className="mt-4 flex gap-3">
                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition hover:bg-gray-800">
                  <FiShoppingBag size={18} />
                  Add to Cart
                </button>

                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                  <FiHeart size={18} />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="pb-28 lg:pb-0">
          
          {/* BADGE */}
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
            Premium Jewellery
          </span>

          {/* TITLE */}
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
            Diamond Wedding Necklace Set
          </h1>

          {/* RATINGS */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className="fill-yellow-400"
                  size={17}
                />
              ))}
            </div>

            <p className="text-sm text-gray-500">
              4.9 Ratings · 128 Reviews
            </p>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex items-center gap-3">
            <h2 className="text-4xl font-bold text-gray-900">
              ₹1,24,999
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              20% OFF
            </span>
          </div>

          <p className="mt-2 text-base text-gray-400 line-through">
            ₹1,56,999
          </p>

          {/* DESCRIPTION */}
          <p className="mt-6 text-sm leading-7 text-gray-600">
            Elegant handcrafted diamond necklace set designed for weddings,
            receptions, and luxury occasions. Crafted with premium certified
            diamonds and elegant finishing.
          </p>

          {/* DETAILS */}
          <div className="mt-8 space-y-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-medium text-gray-700">
                Material
              </span>

              <span className="text-gray-500">
                18K Gold
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-medium text-gray-700">
                Diamond
              </span>

              <span className="text-gray-500">
                Certified VVS
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Weight
              </span>

              <span className="text-gray-500">
                32 gm
              </span>
            </div>
          </div>

          {/* FEATURES */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <FiTruck
                  className="text-pink-500"
                  size={20}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Free Delivery
                </h4>

                <p className="text-xs text-gray-500">
                  On prepaid orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <MdVerified
                  className="text-pink-500"
                  size={20}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Certified Jewellery
                </h4>

                <p className="text-xs text-gray-500">
                  100% Authentic Product
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FIXED BUTTONS */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 p-3 backdrop-blur-xl lg:hidden">
        <div className="flex gap-3">
          <button className="flex h-11 flex-1 items-center justify-center rounded-full border border-black bg-white text-sm font-medium text-black">
            Wishlist
          </button>

          <button className="flex h-11 flex-1 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;