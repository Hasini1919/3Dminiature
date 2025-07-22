//logic provider file. for global state management for header.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
// connected to layout.tsx and used in header.tsx
interface AppContextType {
  isLoggedIn: boolean;
  role: string | null;
}

// Initial values
const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  role: null,
});

// Provider Component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setIsLoggedIn(true);
      setRole((session.user as any).role || "user"); // optional: customize role
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, [session, status]);

  return (
    <AppContext.Provider value={{ isLoggedIn, role }}>
      {children}
    </AppContext.Provider>
  );
};

// Context Hook (to access anywhere)
export const useAppContext = () => useContext(AppContext);

