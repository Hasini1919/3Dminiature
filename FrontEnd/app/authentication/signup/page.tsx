"use client";

import AuthCard from "@/components/auth-components/SignUpComponents/AuthCard" ;
import SignUpForm from "@/components/auth-components/SignUpComponents/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-white">
        
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-3/5 relative">
          <Image
            src="/login.jpg"
            alt="Sign Up"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Welcome to Tiny Treasures
          </h2>

          <AuthCard>
            <SignUpForm />

            {/* Already have an account? */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link href="/authentication/login" className="text-red-500 hover:underline">
                Sign In
              </Link>
            </p>
          </AuthCard>
        </div>

      </div>
    </div>
  );
}