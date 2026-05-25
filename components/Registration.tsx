"use client";

import { useState } from "react";

import Link from "next/link";

import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineLockClosed,
} from "react-icons/hi";

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        
        {/* TOP */}
        <div className="text-center">
          
          <h1 className="text-3xl font-bold text-gray-900">
            Pahadi Collections
          </h1>

          <p className="mt-2 text-gray-500">
            {isLogin
              ? "Login to continue shopping"
              : "Create your new account"}
          </p>
        </div>

        {/* FORM */}
        <form className="mt-10 space-y-5">
          
          {/* NAME */}
          {!isLogin && (
            <div className="relative">
              
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition-all focus:border-gray-400"
              />
            </div>
          )}

          {/* EMAIL / PHONE */}
          <div className="relative">
            
            {isLogin ? (
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
            ) : (
              <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
            )}

            <input
              type={
                isLogin
                  ? "text"
                  : "tel"
              }
              placeholder={
                isLogin
                  ? "Email or Phone"
                  : "Phone Number"
              }
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition-all focus:border-gray-400"
            />
          </div>

          {/* EMAIL REGISTER */}
          {!isLogin && (
            <div className="relative">
              
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition-all focus:border-gray-400"
              />
            </div>
          )}

          {/* PASSWORD */}
          <div className="relative">
            
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition-all focus:border-gray-400"
            />
          </div>

          {/* FORGOT */}
          {isLogin && (
            <div className="text-right">
              
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* BUTTON */}
          <button className="w-full rounded-2xl bg-amber-600 py-4 text-lg font-medium text-white transition-all hover:bg-amber-500 cursor-pointer">
            
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* BOTTOM SWITCH */}
        <div className="mt-8 text-center text-sm text-gray-500">
          
          {isLogin ? (
            <div className="flex items-center justify-center gap-2">
              
              <p>Don&apos;t have an account?</p>

              <button
                onClick={() =>
                  setIsLogin(false)
                }
                className="font-semibold text-amber-600 cursor-pointer hover:underline"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              
              <p>Already have an account?</p>

              <button
                onClick={() =>
                  setIsLogin(true)
                }
                className="font-semibold text-amber-600 cursor-pointer hover:underline"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Registration;