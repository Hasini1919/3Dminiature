// app/help-and-support/layout.tsx
import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Background Banner */}
      <div className="h-[40vh] bg-[url('/assets/Help.png')] bg-cover bg-center bg-no-repeat relative bg-fixed">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Help & Support</h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="relative -mt-28 px-4 sm:px-6 lg:px-8 z-10">
        {children}
      </div>

      <Footer />
    </div>
  );
}
