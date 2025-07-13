"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface ImageItem {
  _id: string;
  title: string;
  imageUrl: string; // should be something like "/products/frame1.jpg"
}

export default function ScrollerImg() {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scrollerimg");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scrollerimg) => {
        scrollerimg.setAttribute("data-animation", "true");
      });
    }
  }, [images]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5500/images");
        setImages(response.data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="scrollerimg container mx-auto">
        <ul className="text-list text-lg flex gap-8 ml-30 mx-auto overflow-hidden animate-scroll">
          {images.map((item) => (
  <li key={item._id} className="flex flex-col items-center text-gray-500">
    <div className="w-[200px] h-[200px] relative rounded-lg border-4 border-red-500 shadow-md">
      <Image
        src={`http://localhost:5500${item.imageUrl}`}
        alt={item.title}
        fill
        className="object-cover"
      />
    </div>
    {item.title}
  </li>
))}

        </ul>
      </div>

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
