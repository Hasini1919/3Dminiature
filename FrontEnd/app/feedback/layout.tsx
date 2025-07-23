// app/feedback/layout.tsx
import React from 'react';

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
    
      <div className="absolute inset-0 bg-[url('/assets/Fedback%2003.png')] bg-cover bg-center bg-fixed  z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

