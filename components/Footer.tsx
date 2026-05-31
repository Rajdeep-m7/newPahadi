import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

import visa from "../public/image copy 8.png";
import mastercard from "../public/image copy 9.png";
import rupay from "../public/image copy 10.png";
import upi from "../public/image copy 11.png";
import logoFooter from "../public/footer-logo-dev.svg"
import logoPc from "../public/logo pc copy.svg";

import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f7f7f7] border-t border-amber-200">
      
      {/* TOP SECTION */}
      <div className="page-shell py-12">
        
        <div className="flex justify-between flex-wrap flex-col sm:flex-row gap-7">
          
          {/* LOGO & SOCIAL */}
          <div className="w-fit">
            <Image height={40} width={120} src={logoPc} alt="Pahadi Collections" className="h-10 w-auto" />

            <p className="mt-6 text-lg font-medium text-gray-800">
              We Accept
            </p>

            <div className="flex items-center gap-3 mt-4">
              
              <div className="bg-white px-4 py-2 rounded-md shadow-sm text-sm font-semibold">
                <Image height={24} width={48} src={visa} alt="Visa" className="h-6 w-auto" />
              </div>

              <div className="bg-white px-4 py-2 rounded-md shadow-sm text-sm font-semibold">
                <Image height={24} width={48} src={mastercard} alt="MasterCard" className="h-6 w-auto" />
              </div>

              <div className="bg-white px-4 py-2 rounded-md shadow-sm text-sm font-semibold">
                <Image height={24} width={48} src={rupay} alt="RuPay" className="h-6 w-auto" />
              </div>

              <div className="bg-white px-4 py-2 rounded-md shadow-sm text-sm font-semibold">
                <Image height={24} width={48} src={upi} alt="UPI" className="h-6 w-auto" />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-lg font-medium text-gray-800">
                Follow Us
              </p>

              <div className="flex items-center gap-5 mt-4">
                
                <FaFacebookF className="text-xl text-gray-700 hover:text-blue-500 transition-all duration-300 cursor-pointer" />

                <FaInstagram className="text-xl text-gray-700 hover:text-pink-500 transition-all duration-300 cursor-pointer" />

                <FaTwitter className="text-xl text-gray-700 hover:text-blue-400 transition-all duration-300 cursor-pointer" />

                <FaYoutube className="text-xl text-gray-700 hover:text-red-500 transition-all duration-300 cursor-pointer" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Resources Link
            </h2>

            <div className="flex flex-col gap-4 mt-6 text-gray-600">
              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Delivery Collections
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Shopping Info
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Check Order
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Cancellation
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Order History
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Information
            </h2>

            <div className="flex flex-col gap-4 mt-6 text-gray-600">
              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Accounts
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Order History
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Wishlist
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Cart
              </p>

              <p className="hover:text-amber-500 cursor-pointer transition-all">
                Payments
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>

            <div className="flex flex-col gap-5 mt-6 text-gray-600">
              
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-blue-500" />

                <p>+91 9749388527</p>
              </div>

              <div className="flex items-start gap-3">
                <FaWhatsapp className="mt-1 text-green-500" />

                <p>+91 9749388527</p>
              </div>

              <div className="flex items-start gap-3">
                <MdEmail className="mt-1 text-red-500 text-xl" />

                <p>pahadicollections124@gmail.com</p>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-500" />

                <p>
                  Shanti Nagar Near Jhali Basti TCP,
                  <br />
                  Near Khaprail Bazar,
                  <br />
                  Siliguri, West Bengal,
                  <br />
                  India - 734009
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-gray-300 relative">
          
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#f7f7f7] px-4 text-amber-500 text-xl">
            ✦
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
          
          <p>
            © Pahadi Collections. All Rights Reserved - {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3">
            <p className="hover:text-amber-500 cursor-pointer transition-all">
              Terms & Condition
            </p>

            <span>|</span>

            <p className="hover:text-amber-500 cursor-pointer transition-all">
              Privacy Policy
            </p>
          </div>

          <p className="flex gap-2 items-center">
            <Link href="https://rebootai.in/" className="font-semibold text-black">
              <Image height={20} width={80} src={logoFooter} alt="Reboot AI" className="h-5 w-auto brightness-200 invert" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
