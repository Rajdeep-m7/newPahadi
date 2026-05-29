"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { Product, VariantResponse } from "@/lib/services/product";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { shopApi } from "@/lib/fetchers";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import ReviewSection from "./ReviewSection";
import Link from "next/link";

type ProductPageProps = {
  product?: Product | null;
  variant?: VariantResponse | null;
  similarProducts?: Product[];
};

const fallbackImage =
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const ProductPage = ({ product, variant, similarProducts = [] }: ProductPageProps) => {
  if (!product && !variant) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fafafa] py-12 px-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center text-gray-300">
            <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
          <p className="mt-4 text-gray-500">The product you are looking for might have been moved or deactivated.</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#b98b5f] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#a67a52]"
          >
            Go Back Home
          </Link>
        </div>
      </section>
    );
  }

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

  const isOutOfStock = (currentVariant?.stocks !== undefined && currentVariant.stocks <= 0) || currentVariant?.isActive === false;

  const handleWishlist = async () => {
    if (!wishlistVariantId) return;
    try {
      await toggleWishlist(wishlistVariantId, wishlistProduct);
      if (isWishlisted) {
        toast.error("Removed from Wishlist", { duration: 2000 });
      } else {
        toast.success("Added to Wishlist!", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddToCart = () => {
    if (!wishlistVariantId) return;
    if (isOutOfStock) {
      toast.error("Sorry, this item is out of stock", { duration: 2000 });
      return;
    }

    addItem({
      variantId: wishlistVariantId,
      quantity: 1,
      title: wishlistProduct.title,
      image: wishlistProduct.image,
      price: wishlistProduct.price,
      mrp: wishlistProduct.mrp,
      stock: currentVariant?.stocks,
      effectiveTax:
        currentVariant?.effectiveTax ||
        variant?.effectiveTax ||
        product?.effectiveTax ||
        null,
    });
    toast.success("Item added to Cart!", { duration: 2000 });
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
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  // Sync state if images change dynamically
  useMemo(() => {
    setMainImage(productImages[0]);
  }, [productImages]);

  const checkPincode = async () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setPincodeStatus({ status: "loading" });
    try {
      // Use the serviceability endpoint instead of the non-existent check endpoint
      // We attempt to get pickup postcode from product data if available, otherwise fallback
      const pickupPostcode = 
        (product as any)?.pickupWareHouseId?.pinCode || 
        (variant?.currentVariant?.productId as any)?.pickupWareHouseId?.pinCode || 
        "110001";

      const response = await shopApi.get("/shiprocket/serviceability", {
        params: {
          pickup_postcode: pickupPostcode,
          delivery_postcode: pincode,
          weight: "0.5",
          cod: "1"
        }
      });

      if (response.data.success && response.data.data?.status === 200) {
        const srData = response.data.data.data;
        const couriers = srData.available_courier_companies;
        
        if (couriers && couriers.length > 0) {
          const etd = couriers[0].etd;
          setPincodeStatus({
            status: "success",
            message: `Delivery available${etd ? `. Expected by: ${etd}` : ""}`,
          });
        } else {
          setPincodeStatus({
            status: "error",
            message: "No delivery service available for this pincode",
          });
        }
      } else {
        setPincodeStatus({
          status: "error",
          message: response.data.message || "Delivery not available to this location",
        });
      }
    } catch (error: any) {
      setPincodeStatus({
        status: "error",
        message:
          error.response?.data?.message ||
          "Delivery not available to this location",
      });
    }
  };

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
    <div className="w-full space-y-12">
      <section className="xl:h-[calc(100vh-120px)] xl:overflow-hidden">
        <div className="flex flex-col xl:flex-row gap-8 items-start relative h-full">
          {/* Images Column - Sticky */}
          <div className="w-full xl:w-[500px] xl:h-full xl:overflow-y-auto no-scrollbar shrink-0">
            {/* Mobile/Tablet View */}
            <div className="xl:hidden">
              <div className="mx-auto w-full md:max-w-2xl overflow-hidden rounded-[2.5rem] bg-white shadow-sm border border-gray-100">
                <Image
                  src={mainImage}
                  alt={title}
                  width={700}
                  height={700}
                  className="aspect-square w-full object-cover"
                />
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar md:justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 overflow-hidden rounded-xl border bg-white transition-all ${
                      mainImage === img 
                        ? "border-amber-500 ring-2 ring-amber-500/10" 
                        : "border-gray-200 hover:border-amber-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${index + 1}`}
                      width={72}
                      height={72}
                      className="h-16 w-16 md:h-20 md:w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden xl:flex gap-4 items-start">
              {/* Thumbnails on Left */}
              <div className="flex flex-col gap-2 shrink-0">
                {productImages.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setMainImage(img)}
                    className={`overflow-hidden rounded-xl border bg-white transition-all shrink-0 ${
                      mainImage === img
                        ? "border-amber-500 ring-2 ring-amber-500/20"
                        : "border-gray-100 hover:border-amber-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="aspect-square w-16 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 space-y-6">
                <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm border border-gray-100">
                  <Image
                    src={mainImage}
                    alt={title}
                    width={500}
                    height={500}
                    className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-gray-200 group ${
                      isOutOfStock 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                        : "bg-[#222222] text-white hover:bg-amber-500 group"
                    }`}
                  >
                    <FiShoppingBag
                      size={20}
                      className={`transition-transform ${!isOutOfStock && "group-hover:-translate-y-0.5"}`}
                    />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>

                  <button
                    onClick={handleWishlist}
                    disabled={isWishlistPending || !wishlistVariantId}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white transition-all hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isWishlisted ? (
                      <IoHeart className="text-2xl text-red-500" />
                    ) : (
                      <IoHeartOutline className="text-2xl text-gray-700" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column - Independent scroll */}
          <div className="flex-1 w-full xl:h-full xl:overflow-y-auto no-scrollbar pb-28 xl:pb-12">
            <div className="xl:pl-4 space-y-6">
              <div>
                <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 border border-amber-100">
                  {categoryName}
                </span>

                <h1 className="mt-3 text-2xl xl:text-4xl font-bold leading-tight text-gray-900 tracking-tight">
                  {title}
                </h1>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < Math.round(product?.rating || 0) ? "fill-current" : "text-gray-200"}
                        size={16}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {product?.rating || 0} Ratings & {product?.reviews || 0}{" "}
                    Reviews
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {formatPrice(price)}
                  </h2>
                  {mrp > price && (
                    <p className="text-lg text-gray-400 line-through font-medium">
                      {formatPrice(mrp)}
                    </p>
                  )}
                  {discount > 0 && (
                    <span className="rounded-lg bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-600 border border-green-100">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* PINCODE CHECKER */}
                <div className="mt-6 p-4 max-w-fit rounded-2xl bg-gray-50 border border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                    Check Delivery Availability
                  </h4>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) =>
                          setPincode(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter 6-digit Pincode"
                        className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-bold focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                    <button
                      onClick={checkPincode}
                      disabled={pincodeStatus.status === "loading"}
                      className="bg-[#222222] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all disabled:opacity-50"
                    >
                      {pincodeStatus.status === "loading"
                        ? "Checking..."
                        : "Check"}
                    </button>
                  </div>

                  {pincodeStatus.status !== "idle" && (
                    <div
                      className={`mt-3 flex items-center gap-2 text-xs font-bold ${
                        pincodeStatus.status === "success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {pincodeStatus.status === "success" ? (
                        <FiCheckCircle />
                      ) : (
                        <FiAlertCircle />
                      )}
                      {pincodeStatus.message}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest ${
                      hasReturnPolicy
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-gray-50 text-gray-500 border border-gray-100"
                    }`}
                  >
                    <FiTruck size={14} />
                    {returnPolicy}
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Product Description
                </h3>
                <div
                  className="text-sm leading-relaxed text-gray-600 font-medium"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>

              <div className="pt-8 space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 gap-2">
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
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 transition-all hover:bg-white hover:shadow-sm"
                    >
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        {spec.key}
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-[1.5rem] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                    <FiTruck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Free Delivery
                    </h4>
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                      On prepaid orders
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-[1.5rem] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                    <MdVerified size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      Certified Gold
                    </h4>
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5">
                      100% Authentic Product
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW SECTION */}
      {(product?.id || productDetails?._id) && (
        <ReviewSection productId={product?.id || productDetails?._id || ""} />
      )}

      {/* RELATED PRODUCTS */}
      {similarProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-12 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                You May Also Like
              </h3>
              <p className="mt-1 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Based on your interests
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                title={p.title}
                image={p.image}
                price={formatPrice(p.price)}
                oldPrice={p.mrp > p.price ? formatPrice(p.mrp) : undefined}
                discount={p.discount > 0 ? `${p.discount}% OFF` : undefined}
                categoryName={p.categoryName}
                href={`/product/${p.slug}`}
                variantId={p.variantId}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] xl:hidden animate-in slide-in-from-bottom duration-500">
        <div className="flex gap-3">
          <button
            onClick={handleWishlist}
            disabled={isWishlistPending || !wishlistVariantId}
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all ${
              isWishlisted ? "bg-red-50 border-red-100 text-red-500" : "bg-gray-50 border-gray-100 text-gray-700"
            }`}
          >
            {isWishlisted ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex h-14 flex-1 items-center justify-center gap-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-xl shadow-gray-200 ${
              isOutOfStock 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-[#222222] text-white hover:bg-amber-500"
            }`}
          >
            <FiShoppingBag size={20} />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
