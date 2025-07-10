import "./globals.css";
import Slidebar from "../components/Admin_sidebar/Slidebar"
import { AppContextProvider } from "@/context/AppContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f3f0f0fc]`}>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
        ></script>
        <div className="debug">
            <Slidebar />
        <AppContextProvider>{children}</AppContextProvider>
       </div>
      </body>
    </html>
  );
}
