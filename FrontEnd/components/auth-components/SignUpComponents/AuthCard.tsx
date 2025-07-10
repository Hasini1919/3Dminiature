import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {children}
    </div>
  );
}
