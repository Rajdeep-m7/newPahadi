"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { IoIosHeartEmpty } from "react-icons/io";
import { CiUser, CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import MenuItem from "./MenuItem";

import logo from "../public/favicon.png";

import all from "../public/all-jewellery.svg";
import daily from "../public/daily-wear.svg";
import gold from "../public/gold.svg";
import diamond from "../public/diamond.svg";
import earning from "../public/earrings.svg";
import gift from "../public/gift.svg";
import ring from "../public/ring.svg";
import wedding from "../public/weddings.svg";

const menuItems = [
  {
    title: "All Jewellery",
    image: all,
  },
  {
    title: "Daily Wear",
    image: daily,
  },
  {
    title: "Gold",
    image: gold,
  },
  {
    title: "Diamond",
    image: diamond,
  },
  {
    title: "Earrings",
    image: earning,
  },
  {
    title: "Gifts",
    image: gift,
  },
  {
    title: "Rings",
    image: ring,
  },
  {
    title: "Wedding",
    image: wedding,
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      
      {/* TOP HEADER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-3 md:px-6">
        
        {/* LEFT */}
        <div className="flex items-center gap-2">
          
          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <HiOutlineMenu className="text-3xl text-gray-700" />
          </button>

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="Logo"
              width={38}
              height={38}
            />

            <h1 className="text-lg font-semibold text-amber-600 md:text-2xl">
              Pahadi Collections
            </h1>
          </Link>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden w-full max-w-xl items-center gap-3 rounded-full border border-gray-300 px-5 py-3 transition-all duration-300 focus-within:border-amber-500 lg:flex">
          
          <CiSearch className="text-2xl text-gray-500" />

          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5">
          
          {/* WISHLIST */}
          <IoIosHeartEmpty className="cursor-pointer text-2xl text-gray-700 transition-all hover:text-amber-500" />

          {/* USER */}
          <div className="group relative">
            
            <CiUser className="cursor-pointer text-2xl text-gray-700 transition-all duration-300 group-hover:text-amber-500" />

            {/* DROPDOWN */}
            <div className="invisible absolute right-0 top-10 z-50 w-52 translate-y-2 rounded-xl border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              
              <div className="flex flex-col gap-2 p-3">
                
                <Link
                  href="/login"
                  className="w-full rounded-lg bg-amber-500 px-3 py-2 text-center text-white transition-all hover:bg-amber-600"
                >
                  Login / Signup
                </Link>

                <button className="rounded-lg px-3 py-2 text-left transition-all hover:bg-gray-100">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* CART */}
          <IoCartOutline className="cursor-pointer text-2xl text-gray-700 transition-all hover:text-amber-500" />
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="px-4 pb-4 lg:hidden">
        
        <div className="flex items-center gap-3 rounded-full border border-gray-300 px-5 py-3 transition-all duration-300 focus-within:border-amber-500">
          
          <CiSearch className="text-2xl text-gray-500" />

          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between overflow-x-auto no-scrollbar px-2 lg:flex">
        
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            image={item.image}
          />
        ))}
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        
        {/* TOP */}
        <div className="flex items-center justify-between border-b p-5">
          
          <h2 className="text-xl font-semibold">
            Menu
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <HiX className="text-3xl text-gray-700" />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col py-2">
          
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              title={item.title}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}
    </header>
  );
};

export default Header;