"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "returns-refunds", label: "Returns & Refunds" },
  { id: "how-to-return", label: "How to Return a Product" },
  { id: "returns-policy", label: "Returns Policy" },
  { id: "refunds-policy", label: "Refunds Policy" },
];

export default function ReturnRefundPage() {
  const [activeSection, setActiveSection] = useState("returns-refunds");

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 sm:py-16 flex flex-col md:flex-row gap-10">
      {/* Sidebar navigation */}
      <nav className="md:w-60 bg-white border border-gray-200 rounded-md shadow-sm sticky top-24 self-start">
        <ul className="flex md:flex-col overflow-x-auto md:overflow-visible">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => setActiveSection(id)}
                className={`block w-full text-left px-5 py-3 border-b md:border-b-0 md:border-l
                  ${
                    activeSection === id
                      ? "bg-red-100 border-red-600 text-red-600 font-semibold"
                      : "border-transparent text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="flex-1 space-y-10">
        {/* Returns & Refunds */}
        {activeSection === "returns-refunds" && (
          <section id="returns-refunds" className="bg-white rounded-md shadow p-6">
            <h1 className="text-4xl font-semibold mb-6 text-red-600">Returns & Refunds Policy</h1>
            <p className="text-gray-700 leading-relaxed">
              We value our customers and want you to be satisfied with your 3D miniature frame purchase. Please
              read our return and refund policy carefully to understand your rights.
            </p>
          </section>
        )}

        {/* How to Return a Product */}
        {activeSection === "how-to-return" && (
          <section id="how-to-return" className="bg-white rounded-md shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">How to Return a Product</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>Contact our support team at <a href="mailto:support@example.com" className="text-red-500 underline">support@example.com</a> to initiate a return.</li>
              <li>Pack the 3D miniature frame securely in the original packaging.</li>
              <li>Ship the package to the address provided by our support team.</li>
              <li>Keep your shipping receipt until the refund is processed.</li>
            </ol>
          </section>
        )}

        {/* Returns Policy */}
        {activeSection === "returns-policy" && (
          <section id="returns-policy" className="bg-white rounded-md shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Returns Policy</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
              <li>The 3D miniature frame must be unused and in the original packaging.</li>
              <li>You must have the receipt or proof of purchase.</li>
              <li>Some items are non-returnable for hygiene reasons (e.g., personalized goods).</li>
              <li>Returns must be initiated within 30 days of delivery.</li>
            </ul>
          </section>
        )}

        {/* Refunds Policy */}
        {activeSection === "refunds-policy" && (
          <section id="refunds-policy" className="bg-white rounded-md shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Refunds Policy</h2>
            <p className="mb-3 text-gray-700 leading-relaxed">
              Once your 3D miniature frame return is received and inspected, we will notify you of the approval or rejection of your refund.
            </p>
            <p className="mb-3 text-gray-700 leading-relaxed">
              Approved refunds will be processed within 7 business days and credited to your original payment method.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Shipping costs are non-refundable unless the return is due to our error.
            </p>
          </section>
        )}

        {/* Contact Section Always Visible */}
        <section className="bg-white rounded-md shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our return and refund policy, please contact us at:
          </p>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li>Email: <a href="mailto:support@example.com" className="text-red-500 underline">support@example.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-red-500 underline">+1 (234) 567-890</a></li>
          </ul>
        </section>

        <div className="text-center mt-8">
          <Link href="/">
            <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
