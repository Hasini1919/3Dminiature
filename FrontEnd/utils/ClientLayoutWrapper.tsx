// to avoid use context error in layout newly create for header.tsx
// components/ClientLayoutWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { AppContextProvider } from "@/utils/AppContext";
import Header from "@/components/auth-components/HeaderCustomer";
import { ReactNode } from "react";

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppContextProvider>
        <Header />
        {children}
      </AppContextProvider>
    </SessionProvider>
  );
}
