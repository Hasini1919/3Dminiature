"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth-utils/api";
import InputField from "@/components/auth-components/loginComponents/InputField";
import Button from "@/components/auth-components/loginComponents/Button";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const data = await login(formData.email, formData.password);

    // Role-based redirect
    const role = data.user.role;
    console.log("Role is:", role);
    setMessage("✅ Login successful!");

    setTimeout(() => {
      if (role === "admin") {
        router.push("/Admin/Product/Add"); // admin page
      } else {
        router.push("/customerAccount/profile"); // normal user page
      }
    }, 1500);
  } catch (err: any) {
    setMessage(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <InputField
        type="password"
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
      />

      <div className="flex justify-between items-center">
  <button
    type="button"
    onClick={() => router.push("/authentication/resetPassword")}
    className="text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium"
  >
    Forgot Password?
  </button>
</div>

<div className="flex space-x-4">

  <Button
    type="submit"
    text={loading ? "Signing In..." : "Sign In"}
    className="bg-red-600 text-white hover:bg-red-700 font-bold"
    disabled={loading}
  />

  {/* Sign Up navigation only */}
  <Button
    text="Sign Up"
    className="bg-gray-300 text-black hover:bg-gray-400"
    onClick={() => router.push("/authentication/signup")}
  />
</div>

      {message && (
        <p
          className={`text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
