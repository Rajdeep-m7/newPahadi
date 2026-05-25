import React from "react";
import Image from "next/image";

import accessories from "../public/accessories.avif";
import bridal from "../public/bridal-sets.avif";
import mala from "../public/mala-or-pote.avif";
import mens from "../public/men's-collections.avif";
import naugeri from "../public/naugeri.avif";
import mangalsutra from "../public/short-mangalsutra.avif";
import tihari from "../public/tilhari.avif";
import image from "../public/iamge1.avif";
// import image2 from "../public/image2.avif";
import image3 from "../public/image3.avif";
import Link from "next/link";

const categories = [
  {
    name: "Bridal Sets",
    image: bridal,
  },
  {
    name: "mala-pote",
    image: mala,
  },
  {
    name: "tihari",
    image: tihari,
  },
  {
    name: "naugeri",
    image: naugeri,
  },
  {
    name: "Mangalsutra",
    image: mangalsutra,
  },
  {
    name: "men's Collections",
    image: mens,
  },
  {
    name: "Accessories",
    image: accessories,
  },
  {
    name: "Neklace",
    image: image3,
  },
  {
    name: "Others",
    image: image,
  },
];

const Section1 = () => {
  return (
    <section className="w-full px-1 md:px-6 py-10">
      
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Shop By Category
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our latest collections
        </p>
      </div>

      <div className="flex flex-wrap justify-around items-center px-2 md:px-5 gap-2 md:gap-3 ">
        
        {categories.map((item, index) => (
          <Link
          href={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={index}
            className="group flex flex-col items-center cursor-pointer"
          >
            
            <Image
              src={item.image}
              alt={item.name}
              className="h-27 w-27 md:h-32 md:w-32 object-cover transition-all duration-300 group-hover:scale-105"
            />

            <p className="mt-2 text-sm md:text-base font-medium text-gray-700 group-hover:text-amber-500 transition-all duration-300 text-center">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Section1;