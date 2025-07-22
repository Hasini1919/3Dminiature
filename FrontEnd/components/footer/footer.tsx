"use client";

import Link from "next/link";
import { Kalam } from "next/font/google";
import Image from "next/image";
import Subscribe from "./subscribe";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <>
      <footer className="bg-[#292929] pt-12 pb-8">
        {/* Top Grid Section */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-white">
          {/* Column 1 - Customer Care */}
          <div>
            <h4 className="text-xl font-bold mb-8">Customer Care</h4>
            <ul className="space-y-2">
              <li className="hover:underline"><Link href="/help-and-support">Help Center</Link></li>
              <li className="hover:underline"><Link href="/help-and-support/custamize">How to Buy</Link></li>
              <li className="hover:underline"><Link href="/return-refund">Returns & Refunds</Link></li>
              <li className="hover:underline"><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2 - About Us */}
          <div>
            <h4 className="text-xl font-bold mb-8">About</h4>
            <ul className="space-y-2 ">
              <li className="hover:underline"><Link href="/about">About Us</Link></li>
              <li className="hover:underline"><Link href="/feedback">Feedback</Link></li>
              <li className="hover:underline"><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
              <li className="hover:underline"><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 - App and Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl font-bold mb-2">Download App</h4>
            <div className="flex gap-3">
              <Image src="/ap-store.svg" alt="App Store" width={100} height={30} />
              <Image src="/google-play.svg" alt="Google Play" width={100} height={30} />
            </div>
          </div>

          {/* Column 4 - Subscribe */}
          <div>
            <h4 className="text-xl font-bold mb-4">Subscribe</h4>
            <p className="text-sm mb-2">Get the latest updates and offers.</p>
            <Subscribe />
          </div>
        </div>

        {/* Divider */}
         <div className="border-t border-gray-700 mt-10 mb-0"></div>
      </footer>

      {/* Bottom Bar with Darker Background */}
      <div className="bg-[#151515]">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white text-sm items-center gap-y-4">
          {/* Left - Copyright */}
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Tiny Treasure. All rights reserved.</p>

          {/* Center - Payment & Verified */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <Image src="/visan.png" alt="Visa" width={40} height={25} />
              <Image src="/masterlog.svg" alt="Mastercard" width={40} height={25} />
              
            </div>
            <span>Payment Methods</span>
          </div>

          {/* Right - Social Links */}
          <div className="flex justify-center sm:justify-end gap-4 cursor-pointer">
            <Link href="https://www.facebook.com/profile.php?id=61567273401352" target="_blank">
              <Image src="/facebook-1-svgrepo-com.svg" alt="Facebook" width={25} height={25} />
            </Link>
            <Link href="https://www.tiktok.com/@tt_tinytreasures" target="_blank">
              <Image src="/tiktok-svgrepo-com.svg" alt="TikTok" width={25} height={25} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
