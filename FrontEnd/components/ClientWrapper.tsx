"use client";

import { AppContextProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  
  return (
    
      
        <SessionProvider>
        <AppContextProvider>
          <Header  />

          {children}
          <Footer />
        </AppContextProvider>
        </SessionProvider>
      
    
  );
}
