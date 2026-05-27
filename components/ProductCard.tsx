"use client";

import Image from "next/image";
import Link from "next/link";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { Product } from "@/lib/services/product";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";

type ProductCardProps = {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  href?: string;
  categoryName?: string;
  product?: Product;
  variantId?: string;
};

const ProductCard = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  href = "/product",
  categoryName = "22KT Gold Jewellery",
  product,
  variantId,
}: ProductCardProps) => {
  const items = useWishlistStore((state) => state._items);
  const pendingToggles = useWishlistStore((state) => state.pendingToggles);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const addItem = useCartStore((state) => state.addItem);

  const fallbackProduct: Product = {
    id: variantId || href,
    title,
    brand: "Pahadi Collections",
    categoryName,
    image,
    price: Number(price.replace(/[^\d.]/g, "")) || 0,
    mrp: Number(oldPrice?.replace(/[^\d.]/g, "")) || Number(price.replace(/[^\d.]/g, "")) || 0,
    discount: Number(discount?.replace(/[^\d.]/g, "")) || 0,
    rating: 0,
    reviews: 0,
    slug: href.split("/").filter(Boolean).pop() || href,
    variantId,
  };
  const wishlistProduct = product || fallbackProduct;
  const wishlistVariantId = variantId || wishlistProduct.variantId || wishlistProduct.id;
  const wishlisted = items.some((item) => (item.variantId || item.id) === wishlistVariantId);
  const isPending = pendingToggles.has(wishlistVariantId);

  const handleWishlist = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    await toggleWishlist(wishlistVariantId, {
      ...wishlistProduct,
      variantId: wishlistVariantId,
    });
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!wishlistVariantId) return;

    addItem({
      variantId: wishlistVariantId,
      quantity: 1,
      title: wishlistProduct.title,
      image: wishlistProduct.image,
      price: wishlistProduct.price,
      mrp: wishlistProduct.mrp,
      stock: 10, // Default stock if not available
      effectiveTax: wishlistProduct.effectiveTax,
    });
  };

  return (
    <div className="group min-w-0 md:min-w-60 w-full overflow-hidden rounded-xl bg-white border border-gray-200 transition-all duration-300 hover:shadow-xl">

      {/* IMAGE SECTION */}
      <Link href={href} className="relative block overflow-hidden rounded-t-xl">

        <Image
          src={image}
          alt={title} 
          width={500}
          height={600}
          className="h-45 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-65 md:h-70"
        />

        <div className="absolute inset-0 bg-black/5 opacity-0 transition-all duration-300 group-hover:opacity-100" />

        <button
          onClick={handleWishlist}
          disabled={isPending}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md shadow-md"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? (
            <IoHeart className="text-2xl text-red-500" />
          ) : (
            <IoHeartOutline className="text-2xl text-gray-700" />
          )}
        </button>

        <div className="absolute bottom-4 left-1/2 hidden w-[88%] -translate-x-1/2 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">

          <button 
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b98b5f] py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#a67a52]"
          >

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
          {categoryName}
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
        <button 
          onClick={handleAddToCart}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#b98b5f] py-2 text-sm font-semibold text-white md:hidden"
        >

          <FiShoppingBag className="text-lg" />

          Quick Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
