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
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={toggleWishlist}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
          isWishlisted
            ? "bg-red-500 text-white shadow-lg"
            : "bg-gray-200 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        <span className="text-lg font-bold">Add to wishlist</span>
      </button>
    </div>
  );
};

export default AddToWish;
