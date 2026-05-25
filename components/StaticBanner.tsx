"use client";

import Image from "next/image";

const StaticBanner = () => {
  const items = [
    {
      id: 1,
      title: "Girl, get your sparkle on.",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
      large: true,
    },
    {
      id: 2,
      title: "Wedding Jewellery",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "0% Deduction",
      image:
        "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full px-4 py-6 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        
        {/* LEFT BIG CARD */}
        <div className="relative overflow-hidden rounded-3xl lg:col-span-2 h-75 sm:h-100 lg:h-155 group">
          <Image
            src={items[0].image}
            alt={items[0].title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
            <h2 className="max-w-xs text-3xl font-bold leading-tight text-white md:text-5xl">
              Girl, get your sparkle on.
            </h2>

            <button className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
              Shop Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* TOP CARD */}
          <div className="relative overflow-hidden rounded-3xl h-75 group">
            <Image
              src={items[1].image}
              alt={items[1].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                Wedding Jewellery
              </h3>

              <button className="mt-4 w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-gray-200">
                Explore
              </button>
            </div>
          </div>

          {/* BOTTOM CARD */}
          <div className="relative overflow-hidden rounded-3xl h-75 group">
            <Image
              src={items[2].image}
              alt={items[2].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                0% Deduction
              </h3>

              <p className="mt-2 text-sm text-gray-200">
                Exchange your precious gold now
              </p>

              <button className="mt-4 w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-gray-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaticBanner;