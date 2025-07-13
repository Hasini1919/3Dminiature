import Sidebar from "@/components/user-history/slidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    
      
      <div className="h-dvh grid grid-cols-[80px_1fr] overflow-hidden  ">
      <Sidebar />
      <main>
          {children}
      </main>
      </div>
    
    
  );
}
