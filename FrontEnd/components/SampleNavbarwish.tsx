"use client";

import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

const Navbar = () => {
  const { count } = useWishlist();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">My Shop</div>
      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/wishlist")}
      >
        <Heart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
