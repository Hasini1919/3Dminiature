'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import faqImage from '@/public/assets/FAQ.png';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const staticFaqs: FaqItem[] = [
    {
      question: 'How can I accept credit cards online?',
      answer: 'You can enable payment settings via your admin dashboard and integrate with Stripe or PayPal.',
      category: 'Payments',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'No, we currently do not offer international shipping. We only deliver within Sri Lanka.',
      category: 'Shipping',
    },
    {
      question: 'Is there a limit to how many products I can add?',
      answer: 'No hard limit. You can add as many as you like.',
      category: 'Products',
    },
    {
      question: 'How long does delivery take?',
      answer: '3–5 days locally.',
      category: 'Shipping',
    },
  ];

  const categories = ['All', ...new Set(staticFaqs.map(f => f.category))];

  const filteredFaqs = staticFaqs.filter((faq) => {
    const matchSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Header />

      <div className="min-h-screen p-8 sm:p-12 lg:p-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
          {/* Left Image Section */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-md">
              <Image
                src={faqImage}
                alt="FAQ Illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right FAQ Content */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Help Center</h1>
            <p className="text-gray-600 mb-6">Find answers to your questions about our services.</p>

            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition cursor-pointer ${
                    openIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center"
                  >
                    <span className="text-gray-800 font-medium">{faq.question}</span>
                    <span className="text-xl text-gray-500">{openIndex === index ? '-' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
