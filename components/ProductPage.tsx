"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiShoppingBag, FiStar, FiTruck } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { Product, VariantResponse } from "@/lib/services/product";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

type ProductPageProps = {
  product?: Product | null;
  variant?: VariantResponse | null;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const ProductPage = ({ product, variant }: ProductPageProps) => {
  const currentVariant = variant?.currentVariant;
  const productDetails = currentVariant?.productId;
  const title = currentVariant?.title || product?.title || "Product";

  const description =
    productDetails?.desc ||
    product?.desc ||
    "Explore this premium jewellery piece from Pahadi Collections.";

  const categoryName =
    productDetails?.categoryId?.name ||
    product?.categoryName ||
    "Premium Jewellery";

  const returnPolicy =
    productDetails?.returnPolicyType &&
    productDetails.returnPolicyType.toLowerCase() !== "none"
      ? `${productDetails.returnPolicyType}${
          productDetails.returnWindowDays
            ? ` within ${productDetails.returnWindowDays} days`
            : ""
        }`
      : "No return available";

  const hasReturnPolicy =
    productDetails?.returnPolicyType &&
    productDetails.returnPolicyType.toLowerCase() !== "none";

  const price = currentVariant?.price || product?.price || 0;
  const mrp = currentVariant?.mrp || product?.mrp || price;
  const discount =
    mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : product?.discount || 0;

  const wishlistVariantId =
    currentVariant?._id || product?.variantId || product?.id || "";

  const wishlistProduct: Product = {
    ...(product || {
      id: wishlistVariantId,
      title,
      brand: productDetails?.brandId?.name || "Pahadi Collections",
      categoryName,
      image: currentVariant?.coverImage?.url || fallbackImage,
      price,
      mrp,
      discount,
      rating: 0,
      reviews: 0,
      slug: currentVariant?.slug || wishlistVariantId,
    }),
    id: product?.id || wishlistVariantId,
    title,
    categoryName,
    image: currentVariant?.coverImage?.url || product?.image || fallbackImage,
    price,
    mrp,
    discount,
    variantId: wishlistVariantId,
    slug: currentVariant?.slug || product?.slug || wishlistVariantId,
  };

  const wishlistItems = useWishlistStore((state) => state._items);
  const pendingToggles = useWishlistStore((state) => state.pendingToggles);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isWishlisted = wishlistItems.some(
    (item) => (item.variantId || item.id) === wishlistVariantId,
  );
  const isWishlistPending = pendingToggles.has(wishlistVariantId);

  const addItem = useCartStore((state) => state.addItem);

  const handleWishlist = () => {
    if (!wishlistVariantId) return;
    void toggleWishlist(wishlistVariantId, wishlistProduct);
  };

  const handleAddToCart = () => {
    if (!wishlistVariantId) return;

    addItem({
      variantId: wishlistVariantId,
      quantity: 1,
      title: wishlistProduct.title,
      image: wishlistProduct.image,
      price: wishlistProduct.price,
      mrp: wishlistProduct.mrp,
      stock: currentVariant?.stocks || 10,
      effectiveTax:
        currentVariant?.effectiveTax ||
        variant?.effectiveTax ||
        product?.effectiveTax ||
        null,
    });
  };

  const productImages = useMemo(() => {
    const variantImages = [
      currentVariant?.coverImage?.url,
      ...(currentVariant?.imagesArray || []).map((image) => image.url),
    ].filter(Boolean) as string[];

    const images = variantImages.length
      ? variantImages
      : [product?.image || fallbackImage];
    return Array.from(new Set(images));
  }, [currentVariant, product]);

  const [mainImage, setMainImage] = useState(productImages[0]);

  // Sync state if images change dynamically
  useMemo(() => {
    setMainImage(productImages[0]);
  }, [productImages]);

  if (!product && !variant) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-500">
          This product is unavailable or has been removed.
        </p>
      </section>
    );
  }

  return (
    <section className="py-3">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[520px_1fr]">
        {/* Images Column */}
        <div>
          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="mx-auto w-[82%] overflow-hidden rounded-3xl bg-white shadow-sm">
              <Image
                src={mainImage}
                alt={title}
                width={700}
                height={700}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {productImages.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 overflow-hidden rounded-lg border bg-white ${
                    mainImage === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${index + 1}`}
                    width={52}
                    height={52}
                    className="h-12 w-12 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden gap-3 lg:flex">
            <div className="flex w-18 flex-col gap-2">
              {productImages.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setMainImage(img)}
                  className={`overflow-hidden rounded-xl border bg-white transition ${
                    mainImage === img
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${index + 1}`}
                    width={70}
                    height={70}
                    className="h-17 w-17 object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="flex-1">
              <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <Image
                  src={mainImage}
                  alt={title}
                  width={900}
                  height={900}
                  className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <FiShoppingBag size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={handleWishlist}
                  disabled={isWishlistPending || !wishlistVariantId}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isWishlisted ? (
                    <IoHeart className="text-2xl text-red-500" />
                  ) : (
                    <IoHeartOutline className="text-2xl text-gray-700" />
                  )}
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Column */}
        <div className="pb-28 lg:pb-0">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-pink-600">
            {categoryName}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
            {title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-yellow-400" size={17} />
              ))}
            </div>

            <p className="text-sm text-gray-500">
              {product?.rating || 0} Ratings · {product?.reviews || 0} Reviews
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <h2 className="text-4xl font-bold text-gray-900">
              {formatPrice(price)}
            </h2>

            {discount > 0 && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {discount}% OFF
              </span>
            )}
          </div>

          {mrp > price && (
            <p className="mt-2 text-base text-gray-400 line-through">
              {formatPrice(mrp)}
            </p>
          )}

          <div className="mt-4">
            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${
                hasReturnPolicy
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {returnPolicy}
            </span>
          </div>

          <div
            className="mt-6 text-sm leading-7 text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="mt-8 space-y-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            {(productDetails?.specs?.length
              ? productDetails.specs
              : [
                  {
                    key: "Brand",
                    value: product?.brand || "Pahadi Collections",
                  },
                  { key: "Category", value: categoryName },
                  { key: "SKU", value: currentVariant?.sku || "N/A" },
                ]
            ).map((spec) => (
              <div
                key={spec.key}
                className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
              >
                <span className="font-medium text-gray-700">{spec.key}</span>
                <span className="text-gray-500">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <FiTruck className="text-pink-500" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Free Delivery
                </h4>
                <p className="text-xs text-gray-500">On prepaid orders</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                <MdVerified className="text-pink-500" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Certified Jewellery
                </h4>
                <p className="text-xs text-gray-500">100% Authentic Product</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/95 p-3 backdrop-blur-xl lg:hidden">
        <div className="flex gap-3">
          <button
            onClick={handleWishlist}
            disabled={isWishlistPending || !wishlistVariantId}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-black bg-white text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </button>

          <button
            onClick={handleAddToCart}
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-black text-sm font-medium text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
