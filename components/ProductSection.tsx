import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  return (
    <div className="w-full py-10">
      <div>
        <p className="text-3xl font-bold">Latest Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <ProductCard
              key={item}
              image="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              title="14KT Yellow Gold Necklace"
              price="₹12,599"
              oldPrice="₹16,599"
              discount="20% OFF"
            />
          ))}
        </div>
      </div>
      <div className="my-3 mt-5">
        <p className="text-3xl font-bold">All Collections</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <ProductCard
              key={item}
              image="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              title="14KT Yellow Gold Necklace"
              price="₹12,599"
              oldPrice="₹16,599"
              discount="20% OFF"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
