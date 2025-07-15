'use client';
import React from 'react';
import Link from 'next/link';
import { IoIosContact } from 'react-icons/io';
import { MdInterpreterMode } from 'react-icons/md';
import { TbCreditCardRefund } from 'react-icons/tb';
import { SiLivechat } from "react-icons/si";
import { FcFaq } from "react-icons/fc";

export default function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20 px-4 py-10">
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us */}
        <div className="bg-white/90 border border-gray-300 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-3">
              <IoIosContact size={28} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-600 text-sm mb-6">
              Reach out via our contact form for any questions about orders or support.
            </p>
            <Link href="/help/contact">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition">
                Go to Contact Page
              </button>
            </Link>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white/90 border border-gray-300 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 mb-3">
              <MdInterpreterMode size={28} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Terms & Conditions</h2>
            <p className="text-gray-600 text-sm mb-6">
              Review our terms and policies related to purchases, privacy, and more.
            </p>
            <Link href="/terms-and-conditions">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                View Terms
              </button>
            </Link>
          </div>
        </div>

        {/* Customization & Help */}
        <div className="bg-white/90 border border-gray-300 shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-3">
              <TbCreditCardRefund size={28} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Customization & Help</h2>
            <p className="text-gray-600 text-sm mb-6">
              Get guidance on personalizing your 3D frame, choosing the right options, and getting support if needed.
            </p>
            <Link href="/help-and-support/custamize">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                Start Customizing
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Live Chat */}
        <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 hover:shadow-lg transition text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100 mb-3">
            <SiLivechat size={28} className="text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
          <p className="text-gray-600 text-sm mb-6">
            Instantly connect with our support team during business hours.
          </p>
          <Link href="/help/chat">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
              Start Chat
            </button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 hover:shadow-lg transition text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-3">
            <FcFaq size={28} />
          </div>
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <p className="text-gray-600 text-sm mb-6">
            Find answers to common questions about customization, delivery, and more.
          </p>
          <Link href="/faq">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              Browse FAQs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
