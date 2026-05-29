"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCartStore } from "@/lib/store/useCartStore";

// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import { IoIosHeartEmpty } from "react-icons/io";
import { CiUser, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import MenuItem from "./MenuItem";

import logo from "../public/favicon.png";
import logopc from "../public/logo pc.svg";
import fallbackIcon from "../public/all-jewellery.svg";
import { useCustomerStore } from "@/lib/store/useCustomerStore";

export type HeaderCategory = {
  name: string;
  slug: string;
  imageUrl?: string;
  iconUrl?: string;
};

type HeaderClientProps = {
  categories: HeaderCategory[];
};

const HeaderClient = ({ categories }: HeaderClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/category/all-jewellery?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const customer = useCustomerStore((state) => state.customer);

  const isAuthenticated = useCustomerStore((state) => state.isAuthenticated);

  const logout = useCustomerStore((state) => state.logout);

  const menuItems = [
    { name: "All Jewellery", slug: "all-jewellery" },
    ...categories,
  ];

  const wishlistCount = useWishlistStore((state) => state._items?.length || 0);
  const totalCartQuantity = useCartStore((state) => 
    state.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  );

  return (
    <header className="max-w-384 w-full px-4 sm:px-7 lg:px-16 sticky top-0 z-50 bg-white border-b border-gray-50">
      <div className="flex items-center justify-between gap-4 py-1.5 md:py-2">
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <HiOutlineMenu className="text-3xl text-gray-700" />
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Mobile Logo"
              width={38}
              height={38}
              className="block lg:hidden"
            />
            <Image
              src={logopc}
              alt="Desktop Logo"
              width={250}
              height={90}
              className="hidden object-contain lg:block"
            />
          </Link>
        </div>

        <form 
          onSubmit={handleSearch}
          className="hidden w-full max-w-xl items-center gap-3 rounded-full border border-gray-300 px-5 py-3 transition-all duration-300 focus-within:border-amber-500 lg:flex"
        >
          <CiSearch className="text-2xl text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="block lg:hidden"
            aria-label="Toggle Search"
          >
            <CiSearch
              className={`text-2xl transition-all ${showSearch ? "text-amber-500" : "text-gray-700"}`}
            />
          </button>

          <Link href="/wishlist" className="relative">
            <IoIosHeartEmpty className="cursor-pointer text-2xl text-gray-700 transition-all hover:text-amber-500" />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="relative group">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center justify-center p-1 rounded-full transition-colors outline-none"
            >
              <CiUser className={`cursor-pointer text-2xl transition-all duration-300 ${userMenuOpen ? "text-amber-500" : "text-gray-700 group-hover:text-amber-500"}`} />
            </button>
            
            <div className={`absolute right-0 top-12 z-50 w-52 rounded-xl border border-gray-100 bg-white shadow-2xl transition-all duration-300 ${
              userMenuOpen 
                ? "visible translate-y-0 opacity-100" 
                : "invisible translate-y-2 opacity-0 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            }`}>
              <div className="flex flex-col gap-2 p-3">
                {isAuthenticated ? (
                  <>
                    <div className="border-b border-gray-100 pb-2 px-1">
                      <p className="font-bold text-gray-900 truncate">
                        {customer?.name || "Customer"}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate font-medium">{customer?.email || customer?.phone}</p>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-amber-50 hover:text-amber-500"
                    >
                      My Account
                    </Link>

                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-gray-700 transition-all hover:bg-amber-50 hover:text-amber-500"
                    >
                      My Orders
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="rounded-lg px-3 py-2 text-left text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full rounded-lg bg-amber-500 px-3 py-2.5 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#222222]"
                  >
                    Login / Signup
                  </Link>
                )}
              </div>
            </div>
          </div>

          {userMenuOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px] lg:hidden" 
              onClick={() => setUserMenuOpen(false)}
            />
          )}

          <Link href="/cart" className="relative">
            <IoCartOutline className="cursor-pointer text-2xl text-gray-700 transition-all hover:text-amber-500" />
            {totalCartQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-semibold text-white">
                {totalCartQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

      {showSearch && (
        <div className="page-shell pb-4 lg:hidden">
          <form 
            onSubmit={handleSearch}
            className="flex items-center gap-3 rounded-full border border-gray-300 px-5 py-3 transition-all duration-300 focus-within:border-amber-500"
          >
            <CiSearch className="text-2xl text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent text-sm outline-none"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}

      <div className="max-w-384 hidden lg:block border-t border-gray-100 py-1">
        <Swiper
          modules={[FreeMode, Mousewheel, Autoplay]}
          slidesPerView="auto"
          spaceBetween={20}
          loop={true}
          loopAdditionalSlides={menuItems.length}
          speed={800}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          mousewheel={{ forceToAxis: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full"
        >
          {menuItems.map((item) => (
            <SwiperSlide key={item.slug} style={{ width: "auto" }}>
              <MenuItem
                title={item.name}
                image={item.iconUrl || fallbackIcon}
                href={`/category/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <HiX className="text-3xl text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col py-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem
              key={item.slug}
              title={item.name}
              image={item.iconUrl || item.imageUrl || fallbackIcon}
              href={`/category/${item.slug}`}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}
    </header>
  );
};

export default HeaderClient;
