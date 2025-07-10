import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`}
        ></script>
        <div className="debug">
        <AppContextProvider>{children}</AppContextProvider>
       </div>
      </body>
    </html>
  );
}
