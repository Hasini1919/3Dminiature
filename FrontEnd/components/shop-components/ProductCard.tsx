import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Includes half and empty star
import Image from "next/image"; // Next.js Image optimization
import axiosInstance from "@/services/api";

interface ProductCardProps {
  image: string[];
  title: string;
  desc: string;
  rating: number;
  price: number;
  className?: string; // Optional extra classes
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  desc,
  rating,
  price,
  className = "",
}) => {
  // Format price in LKR
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "LKR",
  });

  // Render dynamic rating stars
const renderStars = () => {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-sm sm:text-base">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt key="half" className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-300" />
      ))}
      <span className="ml-2 text-gray-600 font-medium">({safeRating.toFixed(1)})</span>
    </div>
  );
};


  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      {image.map((img: string, index: number) => {
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
          <Image
            key={img}
            src={src}
            alt={title || "Product image"}
            className="w-full h-48 object-cover rounded-md mb-4"
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
        );
      })}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{desc}</p>

      {/* Show dynamic rating */}
      <div className="mb-4">{renderStars()}</div>

      <p className="text-lg font-semibold">{formattedPrice}</p>
    </div>
  );
};

export default ProductCard;
