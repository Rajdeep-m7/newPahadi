"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const ProductPage = () => {
  const productImages = [
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1200&auto=format&fit=crop",
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <section className="min-h-screen px-4 py-6 sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
        {/* LEFT SIDE */}
        <div className="w-full">
          {/* MAIN IMAGE */}
          <div className="relative mx-auto aspect-square max-w-95 overflow-hidden rounded-[28px] bg-gray-100 sm:max-w-105 lg:max-w-115">
            <Image
              src={mainImage}
              alt="Jewellery"
              width={800}
              height={800}
              className="h-full w-full object-cover transition duration-500"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="mx-auto mt-4 grid max-w-95 grid-cols-4 gap-3 sm:max-w-105 lg:max-w-115">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`overflow-hidden rounded-2xl border-2 transition duration-300 ${
                  mainImage === img
                    ? "border-black"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image
                  src={img}
                  alt={`Product ${index}`}
                  width={200}
                  height={200}
                  className="aspect-square h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-pink-500 sm:text-sm">
            Premium Jewellery
          </span>

          <h1 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Diamond Wedding Necklace Set
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-yellow-400" size={18} />
              ))}
            </div>

            <p className="text-sm text-gray-500">4.9 Ratings · 128 Reviews</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ₹1,24,999
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:text-sm">
              20% OFF
            </span>
          </div>

          <p className="mt-2 text-base text-gray-400 line-through sm:text-lg">
            ₹1,56,999
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Elegant handcrafted diamond necklace set designed for weddings and
            special occasions. Crafted with premium diamonds and luxurious gold
            finish to deliver timeless beauty and elegance.
          </p>

          <div className="mt-8 space-y-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                Material
              </span>

              <span className="text-sm text-gray-500 sm:text-base">
                18K Gold
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                Diamond
              </span>

              <span className="text-sm text-gray-500 sm:text-base">
                Certified VVS
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 sm:text-base">
                Weight
              </span>

              <span className="text-sm text-gray-500 sm:text-base">32 gm</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="flex h-14 items-center justify-center gap-2 rounded-full bg-black px-8 text-sm font-medium text-white transition hover:bg-gray-800 sm:text-base">
              <FiShoppingBag size={20} />
              Add to Cart
            </button>

            <button className="flex h-14 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:text-base">
              <FiHeart size={20} />
              Wishlist
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <FiTruck className="text-pink-500" size={22} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 sm:text-base">
                  Free Delivery
                </h4>

                <p className="text-xs text-gray-500 sm:text-sm">
                  On all prepaid orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <MdVerified className="text-pink-500" size={22} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 sm:text-base">
                  Certified Jewellery
                </h4>

                <p className="text-xs text-gray-500 sm:text-sm">
                  100% Authentic Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
