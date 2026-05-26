"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/services/product";

import { HiChevronDown } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

type CategoryPageProps = {
  products: Product[];
  total: number;
  categoryName?: string;
  categorySlug?: string;
  categories: {
    name: string;
    slug: string;
    productCount?: number;
  }[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const CategoryPage = ({
  products,
  total,
  categoryName = "Jewellery Collection",
  categorySlug,
  categories,
}: CategoryPageProps) => {
  const [sortBy, setSortBy] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [products, sortBy]);

  return (
    <section className="w-full py-10">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5f4339] md:text-4xl">
            {categoryName}
          </h1>

          <p className="mt-2 text-gray-500">
            Explore our premium jewellery collection
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 lg:hidden"
          >
            <HiOutlineAdjustmentsHorizontal className="text-xl" />
            Filters
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-2 py-3 md:px-5"
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
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-300 ${
                sortOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              {[
                { label: "Latest", value: "latest" },
                { label: "Price Low to High", value: "lowToHigh" },
                { label: "Price High to Low", value: "highToLow" },
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
                      : "text-gray-700 hover:bg-gray-100"
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
          className={`fixed left-0 top-0 z-60 h-full w-75 overflow-y-auto rounded-none border-r border-gray-200 bg-white p-6 transition-all duration-300 lg:sticky lg:z-auto lg:h-fit lg:w-full lg:translate-x-0 lg:rounded-3xl lg:border ${
            mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <h2 className="text-2xl font-semibold text-[#5f4339]">Filters</h2>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="text-3xl"
            >
              x
            </button>
          </div>

          <h2 className="hidden text-2xl font-semibold text-[#5f4339] lg:block">
            Filters
          </h2>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium text-gray-800">Pricing</h3>

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
            <h3 className="font-medium text-gray-800">Category</h3>
            <div className="mt-4 flex flex-col gap-2">
              {categories.length > 0 ? (
                categories.map((category) => {
                  const isActive = category.slug === categorySlug;

                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={() => setMobileFilterOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                        isActive
                          ? "bg-[#b98b5f] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{category.name}</span>
                      {typeof category.productCount === "number" ? (
                        <span
                          className={`text-xs ${
                            isActive ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          {category.productCount}
                        </span>
                      ) : null}
                    </Link>
                  );
                })
              ) : (
                <p className="rounded-xl bg-gray-100 px-4 py-3 text-gray-700">
                  {categoryName}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">
                {total || sortedProducts.length}
              </span>{" "}
              Products
            </p>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 xl:grid-cols-4 2xl:grid-cols-5">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={formatPrice(product.price)}
                  oldPrice={
                    product.mrp > product.price
                      ? formatPrice(product.mrp)
                      : undefined
                  }
                  discount={
                    product.discount ? `${product.discount}% OFF` : undefined
                  }
                  href={`/product/${product.slug}`}
                  categoryName={product.categoryName}
                  product={product}
                  variantId={product.variantId || product.id}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </div>

      {mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        />
      )}
    </section>
  );
};

export default CategoryPage;
