"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaBalanceScale, FaExpand } from "react-icons/fa";

interface ProductImageGalleryProps {
  image: string[];
}

const ProductImageGallery = ({ image }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<
    Record<number, boolean>
  >({});

  // Filter out empty/invalid images
  const validImages = Array.isArray(image)
    ? image.filter((img) => img && typeof img === "string" && img.trim() !== "")
    : [];

  // Reset when images change
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageLoadErrors({});
  }, [image]);

  const handleWishlist = () => setIsWishlisted(!isWishlisted);
  const handleCompare = () => setIsInCompare(!isInCompare);
  const handleZoom = () => setIsZoomed(!isZoomed);

  /**
   * Simple image URL constructor - assumes backend serves images correctly
   */
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath || imagePath.trim() === "") {
      return "/placeholder-image.jpg";
    }

    // If it's already a full URL, return as-is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it starts with /products, it's already a proper path
    if (imagePath.startsWith("/products/")) {
      return `http://localhost:5500${imagePath}`;
    }

    // Otherwise, assume it's a relative path that needs the base URL
    return `http://localhost:5500/products/${imagePath}`;
  };

  const handleImageError = (index: number) => {
    console.log(`Image failed to load at index ${index}:`, validImages[index]);
    setImageLoadErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Custom loader for Next.js Image component
  const customLoader = ({ src }: { src: string }) => src;

  // No valid images case
  if (validImages.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-lg font-medium">No Image Available</p>
          </div>
        </div>
        <ActionButtons
          isWishlisted={isWishlisted}
          isInCompare={isInCompare}
          onWishlist={handleWishlist}
          onCompare={handleCompare}
        />
      </div>
    );
  }

  const showThumbnails = validImages.length > 1;
  const currentImage = validImages[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
          {!imageLoadErrors[selectedImageIndex] ? (
            <Image
              src={getImageUrl(currentImage)}
              alt={`Product image ${selectedImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
              priority={selectedImageIndex === 0}
              loader={customLoader}
              onError={() => handleImageError(selectedImageIndex)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Image not available</p>
              </div>
            </div>
          )}

          {/* Zoom Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleZoom}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              disabled={imageLoadErrors[selectedImageIndex]}
            >
              <FaExpand className="text-gray-700 text-sm" />
            </button>
          </div>

          {/* Image Counter */}
          {showThumbnails && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {validImages.length}
            </div>
          )}
        </div>

        <ActionButtons
          isWishlisted={isWishlisted}
          isInCompare={isInCompare}
          onWishlist={handleWishlist}
          onCompare={handleCompare}
        />
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Other Images:</h4>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {validImages.map((img, index) => {
              if (index === selectedImageIndex) return null;

              return (
                <div
                  key={index}
                  className="cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ring-1 ring-gray-200 hover:ring-gray-300"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="relative w-full h-20 bg-gray-100">
                    {!imageLoadErrors[index] ? (
                      <Image
                        src={getImageUrl(img)}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        loader={customLoader}
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-xs">📷</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {showThumbnails && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev === 0 ? validImages.length - 1 : prev - 1
              )
            }
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev === validImages.length - 1 ? 0 : prev + 1
              )
            }
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && !imageLoadErrors[selectedImageIndex] && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleZoom}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={getImageUrl(currentImage)}
              alt="Zoomed product image"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
              unoptimized
              loader={customLoader}
            />
            <button
              onClick={handleZoom}
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white"
            >
              <span className="text-gray-700 text-xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Action Buttons Component
const ActionButtons = ({
  isWishlisted,
  isInCompare,
  onWishlist,
  onCompare,
}: {
  isWishlisted: boolean;
  isInCompare: boolean;
  onWishlist: () => void;
  onCompare: () => void;
}) => (
  <div className="flex justify-center space-x-4 mt-4">
    <button
      onClick={onWishlist}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
        isWishlisted
          ? "bg-red-500 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      <span>Wishlist</span>
    </button>

    <button
      onClick={onCompare}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
        isInCompare
          ? "bg-blue-500 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <FaBalanceScale />
      <span>Compare</span>
    </button>
  </div>
);

export default ProductImageGallery;
