"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";
import { useWishlist } from "@/context/WishlistContext";
import { FaTrash, FaHeart, FaShoppingBag } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const { refreshCount } = useWishlist();
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const res = await axiosInstance.get(`/api/wishlist/products/${userId}`);
        const validProducts = res.data.filter((p: Product) => p);
        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemove = async (productId: string) => {
    if (!userId) return;

    setRemoving(productId);
    try {
      await axiosInstance.post("/api/wishlist/remove", { userId, productId });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      refreshCount();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemoving(null);
    }
  };

 const getImageSrc = (imagePath: any): string => {
   const path = Array.isArray(imagePath) ? imagePath[0] : imagePath;

   if (typeof path !== "string" || !path) {
     console.warn("Invalid imagePath:", path);
     return "/placeholder.jpg";
   }

   const parts = path.split("/");
   if (parts.length >= 2) {
     return `${axiosInstance.defaults.baseURL}/products/${encodeURIComponent(
       parts[0]
     )}/${encodeURIComponent(parts[1])}`;
   }

   return path;
 };


  const truncateDescription = (
    description: string,
    maxLength: number = 100
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MdFavorite className="text-red-500 text-4xl mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">My Wishlist</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {products.length > 0
              ? `You have ${products.length} item${
                  products.length > 1 ? "s" : ""
                } in your wishlist`
              : "Your wishlist is waiting for some love"}
          </p>
        </div>

        {products.length === 0 ? (
          /* Empty Wishlist UI */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-6">
                  <FaHeart className="text-6xl text-red-400" />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-8 right-1/4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-300"></div>
                </div>
                <div className="absolute bottom-8 left-1/4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                This wishlist is empty.
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You don't have any products in the wishlist yet. You will find a
                lot of interesting products on our "Shop" page.
              </p>

              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <FaShoppingBag className="inline mr-2" />
                RETURN TO SHOP
              </button>
            </div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={getImageSrc(product.image || "")}
                    alt={product.name}
                    className="w-full h-40 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.jpg";
                    }}
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={removing === product._id}
                    className="absolute top-3 right-3 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 p-2 rounded-full shadow-md transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                    title="Remove from wishlist"
                  >
                    {removing === product._id ? (
                      <div className="animate-spin rounded-md h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <FaTrash className="w-4 h-4" />
                    )}
                  </button>

                  {/* Wishlist Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <FaHeart className="w-3 h-3 mr-1" />
                    Loved
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {truncateDescription(product.description)}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-red-600">
                      LKR {product.price?.toFixed(2) ?? "N/A"}
                    </span>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
