"use client";

import { useState } from "react";

import ProductCard from "@/components/ProductCard";

import { HiChevronDown } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const demoProducts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    title: "14KT Yellow Gold Necklace",
    price: "₹12,599",
    oldPrice: "₹16,599",
    discount: "20% OFF",
    category: "Necklace",
    stock: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    title: "Diamond Earrings",
    price: "₹8,999",
    oldPrice: "₹12,999",
    discount: "30% OFF",
    category: "Earrings",
    stock: true,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
    title: "Luxury Wedding Ring",
    price: "₹19,999",
    oldPrice: "₹24,999",
    discount: "15% OFF",
    category: "Rings",
    stock: false,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
    title: "Luxury Wedding Ring",
    price: "₹19,999",
    oldPrice: "₹24,999",
    discount: "15% OFF",
    category: "Rings",
    stock: false,
  },
];

const categories = [
  "All",
  "Necklace",
  "Earrings",
  "Rings",
  "Bangles",
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [inStockOnly, setInStockOnly] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("latest");

  const [sortOpen, setSortOpen] =
    useState(false);

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const [openCategory, setOpenCategory] =
    useState(true);

  const filteredProducts = demoProducts.filter(
    (product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const stockMatch = inStockOnly
        ? product.stock
        : true;

      return categoryMatch && stockMatch;
    }
  );

  return (
    <section className="w-full px-4 md:px-6 py-10">
      
      {/* TOP */}
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#5f4339]">
            Jewellery Collection
          </h1>

          <p className="mt-2 text-gray-500">
            Explore our premium jewellery collection
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-4">
          
          <button
            onClick={() =>
              setMobileFilterOpen(true)
            }
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 lg:hidden"
          >
            <HiOutlineAdjustmentsHorizontal className="text-xl" />

            Filters
          </button>

          <div className="relative">
            
            <button
              onClick={() =>
                setSortOpen(!sortOpen)
              }
              className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-2 md:px-5 py-3"
            >
              Sort:{" "}
              <span className="md:font-medium">
                {sortBy === "latest"
                  ? "Latest"
                  : sortBy === "lowToHigh"
                  ? "Price Low to High"
                  : "Price High to Low"}
              </span>

              <HiChevronDown
                className={`transition-all duration-300 ${
                  sortOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-3 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-300 z-50 ${
                sortOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              
              {[
                {
                  label: "Latest",
                  value: "latest",
                },
                {
                  label:
                    "Price Low to High",
                  value: "lowToHigh",
                },
                {
                  label:
                    "Price High to Low",
                  value: "highToLow",
                },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setSortBy(item.value);
                    setSortOpen(false);
                  }}
                  className={`w-full px-5 py-4 text-left transition-all ${
                    sortBy === item.value
                      ? "bg-[#b98b5f] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        
        <div
          className={`fixed lg:sticky top-0 left-0 h-full lg:h-fit w-75 lg:w-full bg-white z-60 lg:z-auto rounded-none lg:rounded-3xl border-r lg:border border-gray-200 p-6 transition-all duration-300 overflow-y-auto ${
            mobileFilterOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >

          <div className="mb-6 flex items-center justify-between lg:hidden">
            
            <h2 className="text-2xl font-semibold text-[#5f4339]">
              Filters
            </h2>

            <button
              onClick={() =>
                setMobileFilterOpen(false)
              }
              className="text-3xl"
            >
              ×
            </button>
          </div>

          <h2 className="hidden lg:block text-2xl font-semibold text-[#5f4339]">
            Filters
          </h2>

          <div className="mt-8 border-t pt-6">
            
            <h3 className="font-medium text-gray-800">
              Pricing
            </h3>

            <input
              type="range"
              min="0"
              max="50000"
              className="mt-5 w-full accent-[#b98b5f]"
            />

            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            
            <h3 className="font-medium text-gray-800">
              Availability
            </h3>

            <label className="mt-4 flex items-center gap-3 cursor-pointer">
              
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={() =>
                  setInStockOnly(
                    !inStockOnly
                  )
                }
                className="h-5 w-5 accent-[#b98b5f]"
              />

              <span className="text-gray-600">
                In Stock Only
              </span>
            </label>
          </div>

          <div className="mt-8 border-t pt-6">
            
            <button
              onClick={() =>
                setOpenCategory(
                  !openCategory
                )
              }
              className="flex w-full items-center justify-between"
            >
              <h3 className="font-medium text-gray-800">
                Categories
              </h3>

              <span className="text-2xl text-gray-500">
                {openCategory
                  ? "−"
                  : "+"}
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ${
                openCategory
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                
                <div className="flex flex-col gap-3">
                  
                  {categories.map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() =>
                          setSelectedCategory(
                            category
                          )
                        }
                        className={`rounded-xl px-4 py-3 text-left transition-all ${
                          selectedCategory ===
                          category
                            ? "bg-[#b98b5f] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          
          <div className="mb-6 flex items-center justify-between">
            
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {
                  filteredProducts.length
                }
              </span>{" "}
              Products
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-around gap-2 md:gap-6">
            
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  oldPrice={
                    product.oldPrice
                  }
                  discount={
                    product.discount
                  }
                />
              )
            )}
          </div>
        </div>
      </div>

      {mobileFilterOpen && (
        <div
          onClick={() =>
            setMobileFilterOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
        />
      )}
    </section>
  );
};

export default CategoryPage;