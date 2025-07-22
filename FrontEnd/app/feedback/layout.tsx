// app/feedback/layout.tsx
import React from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/assets/Fedback%2003.png')] bg-cover bg-center bg-fixed z-0" />

      {/* Content with Header + Children + Footer */}
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

