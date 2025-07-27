"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/api";
import { getUserIdFromToken } from "@/utils/auth";
import { useWishlist } from "@/context/WishlistContext";
import { FaTrash, FaHeart, FaShoppingBag } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import Link from "next/link";

interface Advertisement {
  discountPercentage?: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string;
  description: string;
  discountPercentage?: number;
  advertisement?: Advertisement;
  discountedPrice?: number;
  discount?: number;
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
      return "/default-product.jpg";
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

  const getFormattedPrice = (
    originalPrice: number,
    discountedPrice?: number
  ) => {
    const hasDiscount =
      discountedPrice !== undefined && discountedPrice < originalPrice;

    const formatted = new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(discountedPrice ?? originalPrice);

    const original = new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(originalPrice);

    const savePercentage = hasDiscount
      ? ((originalPrice - (discountedPrice ?? originalPrice)) / originalPrice) *
        100
      : 0;

    return {
      formatted,
      original,
      hasDiscount,
      savePercentage,
    };
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
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-6">
                  <FaHeart className="text-6xl text-red-400" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                This wishlist is empty.
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You don't have any products in the wishlist yet. You will find a
                lot of interesting products on our "Shop" page.
              </p>
              <Link href="/shop" passHref>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <FaShoppingBag className="inline mr-2" />
                  RETURN TO SHOP
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const { formatted, original, hasDiscount, savePercentage } =
                getFormattedPrice(product.price, product.discountedPrice);

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                >
                  <Link
                    key={product._id}
                    href={`/shop/product/${product._id}`}
                    className="group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={getImageSrc(product.images || "")}
                        alt={product.name}
                        className="w-full h-40 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/default-product.jpg";
                        }}
                      />

                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleRemove(product._id);
                        }}
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
                  </Link>
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {truncateDescription(product.description)}
                    </p>
                    {/* Price with discount */}
                    <div className="flex flex-col items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-red-600">
                          {formatted}
                        </span>

                        {hasDiscount && (
                          <span className="text-sm text-gray-400 line-through">
                            {original}
                          </span>
                        )}
                      </div>

                      {hasDiscount && savePercentage > 0 && (
                        <span className="text-xs text-green-600 font-medium mt-1">
                          Save {savePercentage.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
