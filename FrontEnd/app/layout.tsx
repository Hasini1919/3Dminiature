// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";
import ClientWrapper from "@/components/ClientWrapper";

// Optional SEO metadata
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {/* Google Maps Script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />

        {/* Global Toast Notifications */}
        <Toaster position="top-center" />

        {/* App Wrapper */}
        <div className="debug">
          <ClientWrapper>
            <WishlistProvider>{children}</WishlistProvider>
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}




