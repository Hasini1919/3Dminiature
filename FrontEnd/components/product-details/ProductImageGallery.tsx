"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axiosInstance from "@/services/api";
import AddToWish from "../addtowish/AddToWish";
import AddReview from "../review/AddReview";
import ProductReviews from "../review/ProductReviews";

const ProductImageGallery = ({
  images,
  product,
}: {
  images: string[];
  product: any;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<
    Record<number, boolean>
  >({});
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const THUMBNAILS_PER_PAGE = 3;

  // Filter out empty/invalid images
  const validImages = Array.isArray(images)
    ? images.filter((img) => img && typeof img === "string" && img.trim() !== "")
    : [];

  // Reset when images change
  useEffect(() => {
    setSelectedImageIndex(0);
    setImageLoadErrors({});
    setThumbnailStartIndex(0);
  }, [images]);

  const handleZoom = () => setIsZoomed(!isZoomed);

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isHovering) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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
    if (imagePath.startsWith("/products")) {
      return `${axiosInstance.defaults.baseURL}${imagePath}`;
    }

    // Otherwise, assume it's a relative path that needs the base URL
    return `${axiosInstance.defaults.baseURL}/products/${imagePath}`;
  };

  const handleImageError = (index: number) => {
    console.log(`Image failed to load at index ${index}:`, validImages[index]);
    setImageLoadErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Custom loader for Next.js Image component
  const customLoader = ({ src }: { src: string }) => src;

  // Thumbnail navigation functions
  const handleThumbnailPrev = () => {
    setThumbnailStartIndex((prev) => Math.max(0, prev - THUMBNAILS_PER_PAGE));
  };

  const handleThumbnailNext = () => {
    const maxStartIndex = Math.max(0, validImages.length - THUMBNAILS_PER_PAGE);
    setThumbnailStartIndex((prev) =>
      Math.min(maxStartIndex, prev + THUMBNAILS_PER_PAGE)
    );
  };

  // Get visible thumbnails (excluding selected image)
  const getVisibleThumbnails = () => {
    const otherImages = validImages.filter(
      (_, index) => index !== selectedImageIndex
    );

    if (otherImages.length <= THUMBNAILS_PER_PAGE) {
      return otherImages.map((img, originalIndex) => ({
        img,
        originalIndex: validImages.findIndex((validImg) => validImg === img),
      }));
    }

    return otherImages
      .slice(thumbnailStartIndex, thumbnailStartIndex + THUMBNAILS_PER_PAGE)
      .map((img, originalIndex) => ({
        img,
        originalIndex: validImages.findIndex((validImg) => validImg === img),
      }));
  };

  // Get grid class based on thumbnail count
  const getThumbnailGridClass = () => {
    const visibleThumbnails = getVisibleThumbnails();
    const count = visibleThumbnails.length;

    if (count <= 2) return "grid-cols-2 justify-center max-w-72 mx-auto";
    if (count <= 3) return "grid-cols-3 justify-center max-w-96 mx-auto";
    return "grid-cols-3 max-w-full";
  };

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
        <AddToWish productId={product._id} variant="button" />
      </div>
    );
  }

  const showThumbnails = validImages.length > 1;
  const currentImage = validImages[selectedImageIndex];
  const visibleThumbnails = getVisibleThumbnails();
  const otherImagesCount = validImages.length - 1;
  const canShowThumbnailPrev = thumbnailStartIndex > 0;
  const canShowThumbnailNext =
    thumbnailStartIndex + THUMBNAILS_PER_PAGE < otherImagesCount;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div
          ref={imageRef}
          className="relative w-full h-96 bg-neutral-200 overflow-hidden rounded-xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: isHovering ? "zoom-in" : "default",
          }}
        >
          {!imageLoadErrors[selectedImageIndex] ? (
            <Image
              src={getImageUrl(currentImage)}
              alt={`Product image ${selectedImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 ease-in-out"
              style={{
                transform: isHovering ? "scale(1.4)" : "scale(1)",
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
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
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Other Images:</h4>

          <div className="relative">
            {/* Thumbnail Grid */}
            <div className={`grid ${getThumbnailGridClass()} gap-3`}>
              {visibleThumbnails.map(({ img, originalIndex }, displayIndex) => (
                <div
                  key={originalIndex}
                  className="cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ring-1 ring-gray-200 hover:ring-gray-300"
                  onClick={() => setSelectedImageIndex(originalIndex)}
                >
                  <div className="relative w-full h-20 bg-gray-100">
                    {!imageLoadErrors[originalIndex] ? (
                      <Image
                        src={getImageUrl(img)}
                        alt={`Thumbnail ${originalIndex + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        loader={customLoader}
                        onError={() => handleImageError(originalIndex)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-xs">📷</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail Navigation Arrows */}
            {otherImagesCount > THUMBNAILS_PER_PAGE && (
              <>
                {canShowThumbnailPrev && (
                  <button
                    onClick={handleThumbnailPrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 p-2 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>
                )}
                {canShowThumbnailNext && (
                  <button
                    onClick={handleThumbnailNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 p-2 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-all"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Image Navigation Arrows */}
      {showThumbnails && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev === 0 ? validImages.length - 1 : prev - 1
              )
            }
            className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-xl font-bold"
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setSelectedImageIndex((prev) =>
                prev === validImages.length - 1 ? 0 : prev + 1
              )
            }
            className="p-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-xl font-bold"
          >
            &gt;
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
      {/* Add to Wishlist Button */}
      <div>
        <AddToWish productId={product._id} variant="button" />
      </div>

      {/* Reviews and Add Review Component */}
      <div className="mt-8">
        <ProductReviews productId={product._id} />
      </div>
    </div>
  );
};


export default ProductImageGallery;
