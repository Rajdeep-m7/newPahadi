"use client";

import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useCartStore } from "@/lib/store/useCartStore";

const CartPage = () => {
  const { items: cartItems, updateQuantity, removeItem } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  // Calculate total tax based on each item's effectiveTax slabs
  const totalTax = cartItems.reduce((acc, item) => {
    if (!item.effectiveTax || item.effectiveTax.length === 0) return acc;
    const itemPrice = item.price || 0;
    const itemTax = item.effectiveTax.reduce((tAcc, slab) => {
      return tAcc + (itemPrice * (slab.slab / 100));
    }, 0);
    return acc + (itemTax * item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fafafa] py-12 px-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center text-gray-300">
            <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-4 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#b98b5f] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#a67a52]"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-4">
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your selected jewellery items ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="space-y-3 sm:space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.variantId}
              className="rounded-3xl border border-gray-100 bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.03)] sm:p-4"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-28 sm:w-28 border border-gray-50">
                  <Image
                    src={item.image || "/favicon.png"}
                    alt={item.title || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Premium Jewellery Collection
                      </p>
                      
                      {/* TAX DISPLAY */}
                      {item.effectiveTax && item.effectiveTax.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.effectiveTax.map((slab, idx) => (
                            <span key={idx} className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                              {slab.name}: {slab.slab}%
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => removeItem(item.variantId)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 sm:text-2xl">
                        ₹{item.price?.toLocaleString()}
                      </h4>
                      {item.mrp && item.mrp > (item.price || 0) && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{item.mrp.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-1">
                      <button 
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={15} />
                      </button>

                      <span className="min-w-7 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button 
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white"
                      >
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
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
                <span>Tax</span>
                <span>₹{Math.round(totalTax).toLocaleString()}</span>
              </div>

              <div className="border-t border-dashed pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900 sm:text-lg">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{Math.round(subtotal + totalTax).toLocaleString()}
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
};

export default CartPage;
