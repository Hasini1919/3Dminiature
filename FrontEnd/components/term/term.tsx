import React from 'react';
import { RxCrossCircled } from 'react-icons/rx';

export default function Terms({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const sections = [
    {
      title: '1. Account Creation and Usage',
      content: `To place an order, you may be required to create an account or provide basic personal details such as your name, address, phone number, and email.
You are responsible for maintaining the confidentiality of your login information and for all activities under your account.`,
    },
    {
      title: '2. Order and Customization',
      content: `When placing an order for a 3D frame, please double-check all customization details (such as names, dates, photos, colors, or size preferences).
Once confirmed and in processing, changes may not be possible.
We reserve the right to cancel orders with incomplete or incorrect details.`,
    },
    {
      title: '3. Payments',
      content: `All payments are processed securely through trusted gateways (e.g., PayPal, Stripe, or Cash on Delivery).
We do not store or share any sensitive payment information.`,
    },
    {
      title: '4. Shipping and Delivery',
      content: `We aim to deliver your custom frame within the timeline displayed at checkout.
Delays may occur due to customization, weather, or courier issues.
You will receive tracking details once your item is shipped.`,
    },
    {
      title: '5. Returns and Cancellations',
      content: `Because each frame is custom-made, returns are only accepted for damaged or defective products.
Cancellations can only be made before the frame enters production.
If there’s an issue with your order, please contact us within 3 days of delivery.`,
    },
    {
      title: '6. Privacy',
      content: (
        <>
          Your personal data is collected only for order processing and is never shared with third parties.<br />
          For more information, refer to our{' '}
          <a href="/privacy" className="text-red-600 underline hover:text-red-800">
            Privacy Policy
          </a>.
        </>
      ),
    },
    {
      title: '7. Intellectual Property',
      content: `All 3D frame designs, product images, and content on our site are owned by Tiny Treasure and may not be copied or reused without permission.`,
    },
    {
      title: '8. Limitation of Liability',
      content: `Tiny Treasure is not liable for indirect losses, including delays caused by incorrect addresses or courier issues.
We are also not responsible for how the customer uses the final product.`,
    },
    {
      title: '9. Changes to Terms',
      content: `We may update these terms from time to time. Continued use of our platform implies your acceptance of the latest terms.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          <RxCrossCircled />
        </button>

        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center uppercase tracking-wider">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-6 text-justify leading-relaxed">
          Welcome to <strong className="text-black">Tiny Treasure</strong>, your trusted online store for custom 3D frame orders.
          By accessing or placing an order through our website or app, you agree to the following terms and conditions.
        </p>

        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
            <div className="text-gray-700 text-justify leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}

        <div className="mt-8 text-sm text-gray-500 text-center">Last updated: July 2025</div>
      </div>
    </div>
  );
}

