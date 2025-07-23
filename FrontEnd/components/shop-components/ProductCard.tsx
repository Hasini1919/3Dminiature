import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import axiosInstance from "@/services/api";
import AddToWish from "@/components/addtowish/AddToWish";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
  image?: string;
  // Add other fields you use in the ProductCard
}

interface ProductCardProps {
  _id: string;
  title: string;
  images: string[];
  desc: string;
  averageRating?: number;
  price: number;
  discountPercentage?: number;
  className?: string;
  advertisement?: {
    discountPercentage?: number;
  };
  product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  images,
  desc,
  title,
  averageRating,
  price,
  discountPercentage = 0,
  className = "",
  advertisement,
  product,
}) => {
  
  const basePrice = product?.price ?? price;
  const productDiscount = product?.discount ?? discountPercentage ?? 0;

  // Advertisement overrides product discount
  const effectiveDiscount =
    advertisement?.discountPercentage && advertisement.discountPercentage > 0
      ? advertisement.discountPercentage
      : productDiscount;

  const hasDiscount = effectiveDiscount > 0;

  const discountedPrice = hasDiscount
    ? Math.round(basePrice - basePrice * (effectiveDiscount / 100))
    : basePrice;

  const formattedPrice = discountedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "LKR",
  });

  const originalPrice = basePrice.toLocaleString("en-US", {
    style: "currency",
    currency: "LKR",
  });

  // Render rating stars only if averageRating is valid
  const renderStars = (averageRating?: number) => {
    // Return null if rating is missing, undefined, null, or not a number
    if (
      typeof averageRating !== "number" ||
      isNaN(averageRating) ||
      averageRating < 0
    ) {
      return (
        <div className="flex items-center space-x-1 text-xs mb-2 text-gray-400">
          <span className="text-gray-400"></span>
        </div>
      );
    }

    // Clamp rating between 0 and 5
    const clampedRating = Math.max(0, Math.min(5, averageRating));
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

    return (
      <div className="flex items-center space-x-1 text-xs mb-2">
        <div className="flex">
          {[...Array(fullStars)].map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-400 text-xs" />
          ))}
          {hasHalfStar && (
            <FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <FaRegStar
              key={`empty-${index}`}
              className="text-gray-300 text-xs"
            />
          ))}
        </div>
        <span className="text-gray-500 text-xs font-medium">
          ({clampedRating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 ${className}`}
    >
      <div className="relative overflow-hidden">
        {images.map((img: string, index: number) => {
          let src = img;
          if (!img.startsWith("http")) {
            const parts = img.split("/");
            if (parts.length === 2) {
              src = `${
                axiosInstance.defaults.baseURL
              }/products/${encodeURIComponent(parts[0])}/${encodeURIComponent(
                parts[1]
              )}`;
            } else {
              src = "/default-product.jpg";
            }
          }

          return (
            <div key={img} className="relative">
              {/* Discount badge - positioned in top left */}
              {hasDiscount && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                    -{effectiveDiscount}%
                  </span>
                </div>
              )}

              {/* Like button */}
              <div>
                {/* <FiHeart className="text-gray-600 hover:text-red-500 transition-colors text-sm" />{" "} */}
                <AddToWish productId={_id} variant="icon-only" />{" "}
              </div>

              {/* Enhanced image with overlay effects */}
              <div className="relative overflow-hidden">
                <Image
                  src={src}
                  alt="Product image"
                  className="w-full h-56 sm:h-48 md:h-64 lg:h-56 xl:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  width={500}
                  height={500}
                  unoptimized={true}
                  priority={index === 0}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = "/default-product.jpg";
                    target.onerror = null;
                  }}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content section with increased font sizes */}
      <div className="p-3 space-y-2">
        {/* Title - increased font size */}
        <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-red-600 transition-colors">
          {title}
        </h3>

        {/* Description - increased font size */}
        <p className="text-gray-600 text-base line-clamp-2 leading-relaxed">
          {desc}
        </p>

        {/* Rating */}
        {averageRating !== undefined &&
          averageRating !== null &&
          renderStars(averageRating)}

        {/* Price and cart section */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {/* Updated price color to red-600 */}
              <span className="text-lg font-bold text-red-600">
                {formattedPrice}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-xs text-green-600 font-medium">
                Save {(((price - discountedPrice) / price) * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
