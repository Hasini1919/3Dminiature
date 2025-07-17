import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import Slidebar from "../components/Admin_sidebar/Slidebar";
import { AppContextProvider } from "@/context/AppContext";
import { addProduct } from "@/utils/Admin/api";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Kalam } from "next/font/google";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className="antialiased ">
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <div className="debug">
          <Header/>
          <AppContextProvider>{children}</AppContextProvider>
          <Footer/>
        </div>
      </body>
      
    </html>
  );
}
