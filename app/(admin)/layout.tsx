import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./admin.css";
import { Toaster } from "sonner";
//import AdminGuard from "@/components/admin/AdminGuard";
import QueryProvider from "@/components/providers/QueryProvider";
import ProgressProvider from "@/components/providers/ProgressProvider";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pahadi Collections Admin",
  description: "pahadi Collection Admin Panel",
};

export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} antialiased`}>
      <body className="min-h-full bg-[#f7f8fa] text-[#222222] font-[family-name:var(--font-ubuntu)] font-medium">
        <Toaster position="top-right" richColors closeButton />
        <ProgressProvider>
          <QueryProvider>
            {/*<AdminGuard>*/}
              {children}
            {/*</AdminGuard>*/}
          </QueryProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
