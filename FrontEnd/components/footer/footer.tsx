"use client";

import Link from "next/link";
import { Kalam } from "next/font/google";
import Image from "next/image";
import Subscribe from "./subscribe";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#a3a091] via-[#edeef0] to-[#f2f2fb] text-gray-800 pt-12 pb-8">
      {/* Top Grid Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left - Brand Info */}
        <div className="flex flex-col gap-4 items-start text-center md:text-left">
          <h3 className={`${kalam.className} text-3xl text-red-500`}>
            Tiny Treasure
          </h3>
          <p className="text-base leading-relaxed">
            Unleashing creativity with personalized 3D gifts and designs that
            make every moment unforgettable.
          </p>
          <p className="text-base font-semibold text-gray-800">Call us: 0774582344</p>
        </div>

        {/* Middle - Subscribe */}
        <div className="flex flex-col items-center text-center justify-center gap-4 px-4">
          <p className="text-lg">
            Subscribe to explore the latest in personalized 3D designs and
            exclusive updates!
          </p>
          <Subscribe />
        </div>

        {/* Right - Follow Us */}
        <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
          <h4 className="text-xl font-semibold text-gray-800">Follow Us</h4>
          <div className="flex gap-5">
            <Link href="https://www.facebook.com/profile.php?id=61567273401352" target="_blank">
              <Image src="/facebook-1-svgrepo-com.svg" alt="Facebook" width={30} height={30} />
            </Link>
            <Link href="https://www.tiktok.com/@tt_tinytreasures" target="_blank">
              <Image src="/tiktok-svgrepo-com.svg" alt="TikTok" width={30} height={30} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 mb-6"></div>

      {/* Bottom Bar */}
      <div className="bg-[#c4c4d6] text-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center text-sm gap-y-2">
          <p className="text-center sm:text-left col-span-1">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>

          <div className="col-span-2 flex justify-center sm:justify-end space-x-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/term and conditions" className="hover:underline">Terms of Use</Link>
            <Link href="/return-refund" className="hover:underline">Returns & Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

