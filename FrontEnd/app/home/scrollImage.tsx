"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ImageCarousel from "@/components/imageSlide/imageCarousel";

// This matches the transformed object we'll create from image strings
interface ImageItem {
  imageUrl: string;
}

export default function ScrollerImg() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/images");

        const baseUrl = "http://localhost:5500/products";
        const imageItems: ImageItem[] = response.data.images.map((imgPath: string) => ({
          imageUrl: `${baseUrl}/${imgPath}`,
        }));

        setImages(imageItems);
      } catch (err) {
        console.error("Failed to fetch images", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className=" text-3xl font-bold text-gray-800 mb-6">
          Explore Our Stunning Frames
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10  mx-auto">
          From elegant classics to creative 3D displays, browse through our dynamic
          collection of beautifully captured moments.
        </p>

        {loading ? (
          <div className="text-center text-gray-500 text-lg">Loading images...</div>
        ) : images.length > 0 ? (
          <ImageCarousel images={images} />  // assumes ImageCarousel accepts [{ imageUrl }]
        ) : (
          <div className="text-center text-gray-500">No images available.</div>
        )}

        
      </div>
    </div>
  );
}
