import "./globals.css";
import Script from "next/script";
import Slidebar from "../components/Admin_sidebar/Slidebar";
import { AppContextProvider } from "@/context/AppContext";
import { addProduct } from "@/utils/Admin/api";




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
          
          <AppContextProvider>{children}</AppContextProvider>
        </div>
      </body>
    </html>
  );
}
