/*"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface AppContextType {
  isLoggedIn: boolean;
  role: string | null;
}

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  role: null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setIsLoggedIn(true);
      setRole((session.user as any).role || "user");
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

export const useAppContext = () => useContext(AppContext);
*/