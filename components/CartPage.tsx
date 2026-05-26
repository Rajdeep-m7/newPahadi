"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Diamond Wedding Necklace",
      price: 124999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Gold Ring Collection",
      price: 45999,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
  <section className="min-h-screen bg-[#fafafa] py-4">
    
    <div className="mb-5">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Review your selected jewellery items
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">
      
      <div className="space-y-3 sm:space-y-4">
        
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-gray-100 bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4"
          >
            
            <div className="flex gap-3 sm:gap-4">
              
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                
                <div className="flex items-start justify-between gap-2">
                  
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-lg">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Premium Jewellery Collection
                    </p>
                  </div>

                  <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500">
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 sm:text-2xl">
                      ₹{item.price.toLocaleString()}
                    </h4>
                  </div>

                  <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-1">
                    
                    <button className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white">
                      <FiMinus size={15} />
                    </button>

                    <span className="min-w-7 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white">
                      <FiPlus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-6 lg:h-fit">
        
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-6">
          
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4">
            
            <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
              <span>Subtotal</span>

              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
              <span>Shipping</span>

              <span className="font-medium text-green-600">
                Free
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
              <span>Tax</span>

              <span>₹2,000</span>
            </div>

            <div className="border-t border-dashed pt-4">
              
              <div className="flex items-center justify-between">
                
                <span className="text-base font-semibold text-gray-900 sm:text-lg">
                  Total
                </span>

                <span className="text-2xl font-bold text-gray-900">
                  ₹{(subtotal + 2000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Link href="/checkout" className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-medium text-white transition hover:bg-gray-800 sm:h-14 sm:text-base">
            Proceed to Checkout
            <FiArrowRight size={18} />
          </Link>

          <div className="mt-4 rounded-2xl bg-gray-50 p-4">
            <p className="text-xs leading-6 text-gray-500 sm:text-sm">
              Secure checkout with encrypted payment protection and
              certified jewellery guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

export default CartPage;
