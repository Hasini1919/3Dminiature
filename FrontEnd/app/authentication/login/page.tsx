"use client";

import LoginForm from "@/components/auth-components/loginComponents/LoginForm";
import SocialLogin from "@/components/auth-components/loginComponents/SocialLogin";
import AuthCard from "@/components/auth-components/loginComponents/AuthCard";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left */}
        <div
          className="hidden md:block md:w-3/5 bg-cover bg-center"
          style={{ backgroundImage: "url('/login.jpg')" }}
        ></div>

        {/* Right */}
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
            Welcome to Tiny Treasures
          </h2>
          <AuthCard>
            <SocialLogin />
            <LoginForm />
          </AuthCard>
         
        </div>
      </div>
    </div>
  );
};

export default Login;