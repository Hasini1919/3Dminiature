// components/PrivacyModal.tsx
"use client";
import React from "react";

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8  max-w-6xl  max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#cb1a2e] mb-2 flex items-center">
            Privacy Policy
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            At Tiny Treasure, we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide
            when using our 3D frame ordering platform.
          </p>
        </div>

        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <h3 className="text-base font-semibold">1. Information We Collect</h3>
          <ul className="list-disc ml-5">
            <li>Name, email, phone number, and address for order processing and delivery.</li>
            <li>Uploaded images and custom text for frame customization.</li>
            <li>Payment details (handled securely through trusted third-party providers).</li>
          </ul>

          <h3 className="text-base font-semibold mt-4">2. How We Use Your Data</h3>
          <ul className="list-disc ml-5">
            <li>Process and deliver your 3D frame orders.</li>
            <li>Communicate order updates and confirmations.</li>
            <li>Improve your shopping experience on our site.</li>
            <li>Ensure secure payments via encrypted gateways.</li>
          </ul>

          <h3 className="text-base font-semibold mt-4">3. Data Security</h3>
          <p>
            Your data is securely stored and never sold or shared with third parties without your consent,
            except as needed to fulfill your order (e.g., delivery partners). Payment details are never stored
            on our servers.
          </p>

          <h3 className="text-base font-semibold mt-4">4. Cookies & Analytics</h3>
          <p>
            We may use cookies to improve site performance and analyze user behavior, but we do not track or
            collect unnecessary personal data.
          </p>

          <h3 className="text-base font-semibold mt-4">5. Your Rights</h3>
          <ul className="list-disc ml-5">
            <li>Request access to or deletion of your personal data.</li>
            <li>Opt out of promotional messages at any time.</li>
          </ul>

          <p className="mt-4 font-medium">
            By using Tiny Treasure, you agree to this privacy policy.
          </p>
        </div>

        <div className="text-right mt-6">
          <button
            onClick={onClose}
            className="bg-[#cb1a2e] text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;

