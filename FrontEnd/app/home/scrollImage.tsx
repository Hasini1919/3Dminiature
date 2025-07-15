"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ImageCarousel from "@/components/imageSlide/imageCarousel";

interface ImageItem {
  _id: string;
  title: string;
  imageUrl: string;
}

export default function ScrollerImg() {
  const [images, setImages] = useState<ImageItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5500/images");
        setImages(response.data);
      } catch (err) {
        console.error("Failed to fetch images", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading images...
      </div>
    );
  }

  return (
    <>
      {images && images.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <div className="text-center mt-10 text-gray-500">
          No images available.
        </div>
      )}

      <div className="mt-6 flex justify-center w-full">
        <Link href="/shop">
          <button className="h-10 w-40 px-6 bg-red-600 text-white text-lg font-semibold rounded shadow-lg hover:bg-orange-600 transition">
            SHOP NOW
          </button>
        </Link>
      </div>
    </>
  );
}
