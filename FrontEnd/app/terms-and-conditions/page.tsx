"use client";
import React, { useState } from "react";
import Term from "@/public/assets/Contract.jpeg";
import Image from "next/image";
import Condition from "@/components/term/term";


export default function TermsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     

      <div className="grid grid-cols-12 min-h-screen p-20 bg-white">
        {/* Left Side */}
        <div className="col-span-6 grid grid-rows-12 gap-4">
          <div className="row-span-2 flex items-center">
            <h1 className="uppercase text-4xl font-mono font-bold">
              Terms and Conditions
            </h1>
          </div>

          <div className="row-span-6 flex items-center text-justify pr-10">
            <p>
              By placing an order with Tiny Treasure, you agree to comply with
              our terms and conditions. We collect only the essential personal
              information required to process and deliver your order accurately.
              Your information is used solely for order-related purposes and is
              handled with strict confidentiality. We do not sell, trade, or
              share your personal data with any third parties. All payments made
              on our website are processed through secure and trusted payment
              gateways. We take every precaution to ensure your data and
              transactions are safe. By continuing to use our website, you
              accept and agree to these terms.
            </p>
          </div>

          <div className="row-span-4 grid grid-rows-2 gap-4">
            <p className="pr-10 text-justify">
              We reserve the right to update or modify these terms at any time
              without prior notice. Customers are responsible for providing
              accurate shipping and contact information. Tiny Treasure is not
              liable for delays caused by incorrect details or unforeseen
              delivery issues.
            </p>
            <div className="flex items-end">
              <button
                className="bg-[#cb1a2e] text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={() => setShowModal(true)}
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="col-span-6">
          <Image
            src={Term}
            alt="Contract Terms"
            className="w-full h-full object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Modal */}
      <Condition isOpen={showModal} onClose={() => setShowModal(false)} />

     
    </>
  );
}

