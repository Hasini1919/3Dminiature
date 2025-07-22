"use client";

import AuthCard from "@/components/auth-components/SignUpComponents/AuthCard";
import SignUpForm from "@/components/auth-components/SignUpComponents/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-200 h-[700px]">
        
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/login.jpg"
            alt="Sign Up"
            fill
            sizes="(min-width: 768px) 50vw, 0vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
          <h2 className="text-4xl font-bold text-center text-red-500 mb-6">
            Welcome to Tiny Treasures
          </h2>

          <AuthCard>
            <SignUpForm />

            {/* Already have an account? */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href="/authentication/login"
                className="text-red-600 hover:text-pink-800 font-medium transition"
              >
                Sign In
              </Link>
            </p>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
