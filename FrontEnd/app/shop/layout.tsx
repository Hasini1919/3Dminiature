import React from "react";


const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      
      <main className="min-h-screen">{children}</main>
      
    </>
  );
};

export default ShopLayout;
