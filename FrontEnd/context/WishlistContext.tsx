"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";

interface WishlistContextProps {
  count: number;
  refreshCount: () => void;
}

const WishlistContext = createContext<WishlistContextProps>({
  count: 0,
  refreshCount: () => {},
});

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setCount(0);
      return;
    }

    try {
      const res = await axiosInstance.get(`/api/wishlist/count/${userId}`);
      setCount(res.data.count);
    } catch (error) {
      console.error("Error fetching wishlist count", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <WishlistContext.Provider value={{ count, refreshCount: fetchCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
