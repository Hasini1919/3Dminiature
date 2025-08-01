// pages/privacy.tsx or pages/privacy/index.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import secure from "@/public/assets/Secures.jpg";
import PrivacyModal from "@/components/Privacy/privacy";

export default function PrivacyPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     

      <div className="grid grid-cols-12 min-h-screen p-20 bg-white">
        {/* Left Content */}
        <div className="col-span-6 grid grid-rows-12 gap-8">
          <div className="row-span-4 flex items-center">
            <h1 className="uppercase text-4xl font-mono font-bold">Privacy Policy</h1>
          </div>
          <div className="row-span-4 text-gray-700 text-base leading-relaxed">
            <p>
              At Tiny Treasure, we value your privacy.
              We collect only necessary personal data to process your orders smoothly.
              Your information is securely stored and never shared with third parties.
              All payment details are handled through secure, trusted gateways.
              By using our site, you agree to this simple privacy commitment.
            </p>
          </div>
          <div className="row-span-4">
            <button
              className="bg-[#cb1a2e] text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => setShowModal(true)}
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-span-6">
          <Image
            src={secure}
            alt="Secure"
            className="w-full h-full object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      <PrivacyModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
      
    </>
  );
}
