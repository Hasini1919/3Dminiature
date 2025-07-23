"use client";

import { ThemeProvider } from "@/components/customer-account/ThemeProvider";
import { AppContextProvider } from "@/context/AppContext";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  
  return (
    
      <ThemeProvider>
        <SessionProvider>
        <AppContextProvider>
          <Header  />

          {children}
          <Footer />
        </AppContextProvider>
        </SessionProvider>
      </ThemeProvider>
    
  );
}
