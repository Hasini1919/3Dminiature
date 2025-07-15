'use client';
import React from 'react';
import Link from 'next/link';
import { TbFrame } from 'react-icons/tb';
import { GiPaintBrush } from 'react-icons/gi';
import { MdOutlineTextFields, MdShoppingCart, MdHelpOutline } from 'react-icons/md';

export default function CustomizationHelpPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 ">
      <h1 className="text-2xl  mb-12 text-center text-red-600">How to Customize Your 3D Frame</h1>

      <div className="grid gap-10 sm:grid-cols-2">
        {/* Step 1 */}
        <div className="flex items-start space-x-5">
          <div className="p-4 bg-red-600 text-white rounded-lg shadow-md">
            <TbFrame size={36} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Step 1: Choose Your Frame Model</h2>
            <p className="text-gray-700 text-sm">
              Start by selecting the frame model you like from our product catalog. Each model offers different sizes and styles to suit your taste.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start space-x-5">
          <div className="p-4 bg-purple-600 text-white rounded-lg shadow-md">
            <GiPaintBrush size={36} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Step 2: Select Size and Finish</h2>
            <p className="text-gray-700 text-sm">
              Choose the size that fits your space and the finish that matches your decor. Available finishes include matte, gloss, wood grain, and metallic.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-start space-x-5">
          <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
            <MdOutlineTextFields size={36} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Step 3: Add Personalization</h2>
            <p className="text-gray-700 text-sm">
              Add custom text, dates, or logos to your frame. Use the customization tool on the product page to preview your changes in real time.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex items-start space-x-5">
          <div className="p-4 bg-green-600 text-white rounded-lg shadow-md">
            <MdShoppingCart size={36} />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Step 4: Review and Place Your Order</h2>
            <p className="text-gray-700 text-sm">
              Carefully review your customized frame preview. Once satisfied, add the item to your cart and proceed to checkout.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Need Help or Have Questions?</h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto text-sm">
          If you need assistance with customization or have questions about your order, please don’t hesitate to contact us.
        </p>
        <Link href="/help-and-support">
          <button className="px-8 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition">
            Contact Support
          </button>
        </Link>
      </div>
    </div>
  );
}


