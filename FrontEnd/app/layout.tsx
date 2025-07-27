import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import Script from "next/script";
import { AppContextProvider } from "@/context/AppContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Google Maps script */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />

        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function () {
                var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/687e53f104ad1b191957cac9/1j0mnfqmu';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />

        <AppContextProvider>
          {/* <WishlistProvider> */}
            {/* <Header /> */}
            <main className="min-h-screen">{children}</main>
            {/* <Footer /> */}
          {/* </WishlistProvider> */}
        </AppContextProvider>
      </body>
    </html>
  );
}
