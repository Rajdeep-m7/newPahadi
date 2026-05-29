import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CartSyncProvider from "@/components/providers/CartSyncProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pahadi Collections",
  icons: {
    icon: "/favicon.png",
  },
  description: "Pahadi Collections - Premium Jewellery storefront",
};

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors closeButton />
        <ProgressProvider>
          <QueryProvider>
            <CartSyncProvider />
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
