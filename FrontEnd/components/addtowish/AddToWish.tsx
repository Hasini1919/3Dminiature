import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";
import { useWishlist } from "@/context/WishlistContext";

interface AddToWishProps {
  productId: string;
  variant?: "icon-only" | "button";
}

const AddToWish = ({ productId, variant = "icon-only" }: AddToWishProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userId = getUserIdFromToken();
  const { refreshCount } = useWishlist();

  useEffect(() => {
    if (!userId) return;
    axiosInstance
      .get(`/api/wishlist/products/${userId}`)
      .then((res) => {
        setIsWishlisted(res.data.some((p: any) => p._id === productId));
      })
      .catch(console.error);
  }, [userId, productId]);

  const toggleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userId) {
      alert("Log in first!");
      return;
    }

    try {
      if (isWishlisted) {
        await axiosInstance.post("/api/wishlist/remove", { userId, productId });
        setIsWishlisted(false);
      } else {
        await axiosInstance.post("/api/wishlist/add", { userId, productId });
        setIsWishlisted(true);
      }
      refreshCount();
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
    }
  };

  // === ICON-ONLY STYLE (for shop page)
  if (variant === "icon-only") {
    return (
      <button
        onClick={(e) => toggleWishlist(e)}
        title="Add to Wishlist"
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-20 opacity-0 group-hover:opacity-100"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 hover:scale-110 transition" />
        ) : (
          <FaRegHeart className="text-gray-500 hover:text-red-500 transition" />
        )}
      </button>
    );
  }


  // === FULL BUTTON STYLE (for ProductImageGallery)
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={toggleWishlist}
        className={`group relative flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          isWishlisted
            ? "bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white shadow-xl hover:shadow-2xl focus:ring-red-300 border-2 border-red-400"
            : "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 text-red-700 hover:from-red-50 hover:via-pink-50 hover:to-red-50 hover:text-red-600 shadow-lg hover:shadow-xl focus:ring-gray-300 border-2 border-gray-200 hover:border-red-200"
        }`}
      >
        {/* Background glow effect */}
        <div
          className={`absolute inset-0 rounded-xl blur-xl opacity-30 transition-opacity duration-300 ${
            isWishlisted
              ? "bg-gradient-to-r from-red-400 to-pink-400 group-hover:opacity-50"
              : "bg-gradient-to-r from-gray-200 to-gray-300 group-hover:from-red-200 group-hover:to-pink-200 group-hover:opacity-40"
          }`}
        ></div>

        {/* Icon with animation */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {isWishlisted ? (
            <FaHeart className="w-6 h-6 drop-shadow-sm animate-pulse" />
          ) : (
            <FaRegHeart className="w-6 h-6 drop-shadow-sm group-hover:animate-bounce" />
          )}
        </div>

        {/* Text with gradient effect */}
        <span
          className={`relative z-10 font-bold tracking-wide transition-all duration-300 ${
            isWishlisted
              ? "drop-shadow-sm"
              : "group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent"
          }`}
        >
          {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
        </span>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>

        {/* Floating particles effect for wishlisted state */}
        {isWishlisted && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-2 -left-2 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse delay-300"></div>
            <div className="absolute -bottom-1 right-2 w-1 h-1 bg-red-300 rounded-full animate-bounce delay-500"></div>
          </>
        )}
      </button>
    </div>
  );
}
export default AddToWish;
