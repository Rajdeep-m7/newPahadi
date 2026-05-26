"use client";

import Image from "next/image";
import {
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";

const CheckoutPage = () => {
  return (
    <section className="min-h-screen bg-[#f7f7f7] px-4 py-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_420px]">
        
        {/* LEFT SIDE */}
        <div className="space-y-6">
          
          {/* PAGE TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Checkout
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Complete your order securely
            </p>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
                <FiMapPin className="text-pink-600" size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h2>

                <p className="text-sm text-gray-500">
                  Enter delivery details
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black sm:col-span-2"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black sm:col-span-2"
              />

              <input
                type="text"
                placeholder="Street Address"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black sm:col-span-2"
              />

              <input
                type="text"
                placeholder="City"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
              />

              <input
                type="text"
                placeholder="Postal Code"
                className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          {/* PAYMENT */}
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
                <FiCreditCard
                  className="text-pink-600"
                  size={20}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Method
                </h2>

                <p className="text-sm text-gray-500">
                  All transactions are secure
                </p>
              </div>
            </div>

            <div className="space-y-4">
              
              <div className="flex items-center justify-between rounded-2xl border border-black bg-black px-4 py-4 text-white">
                <div>
                  <p className="font-medium">
                    Credit / Debit Card
                  </p>

                  <p className="text-xs text-gray-300">
                    Visa, Mastercard, Rupay
                  </p>
                </div>

                <input
                  type="radio"
                  checked
                  readOnly
                  className="h-4 w-4"
                />
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="h-12 rounded-2xl border border-gray-200 px-4 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="sticky top-6 max-w-7xl rounded-3xl bg-white p-5 shadow-sm">
            
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            {/* PRODUCT */}
            <div className="mt-6 flex gap-4">
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
                  alt="Jewellery"
                  width={100}
                  height={100}
                  className="h-24 w-24 object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Diamond Necklace Set
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Premium Wedding Collection
                </p>

                <p className="mt-3 text-lg font-bold text-gray-900">
                  ₹1,24,999
                </p>
              </div>
            </div>

            {/* PRICE DETAILS */}
            <div className="mt-6 space-y-4 border-t pt-6">
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹1,24,999
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Taxes
                </span>

                <span className="font-medium">
                  ₹2,500
                </span>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-gray-900">
                  ₹1,27,499
                </span>
              </div>
            </div>

            {/* FEATURES */}
            <div className="mt-6 space-y-4 rounded-2xl bg-gray-50 p-4">
              
              <div className="flex items-center gap-3">
                <FiTruck
                  className="text-pink-600"
                  size={18}
                />

                <p className="text-sm text-gray-600">
                  Free insured shipping
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FiLock
                  className="text-pink-600"
                  size={18}
                />

                <p className="text-sm text-gray-600">
                  Secure encrypted payment
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:bg-gray-800">
              Complete Purchase
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              By placing your order you agree to our terms &
              conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;