import React from 'react';

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Banner */}
      <div className="h-[40vh] bg-[url('/assets/shopping.png')] bg-cover bg-center bg-no-repeat relative bg-fixed">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Help & Support</h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="relative -mt-28   px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
