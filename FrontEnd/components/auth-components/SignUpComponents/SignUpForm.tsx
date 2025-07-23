"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/utils/auth-utils/api"; // your signup API call
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setMessage("❌ Please enter a valid email address.");
    return;
  }
  if (formData.password.length < 8) {
    setMessage("❌ Password must be at least 8 characters long.");
    return;
  }

  if (!/[A-Z]/.test(formData.password)) {
    setMessage("❌ Password must include at least one uppercase letter.");
    return;
  }

  if (!/[0-9]/.test(formData.password)) {
    setMessage("❌ Password must include at least one number.");
    return;
  }

    setLoading(true);
    try {
      const response = await signup(formData.name, formData.email, formData.password);

      if (response.message) {
        setMessage(response.message);

        // Redirect after 2 seconds only if success
        if (!response.message.toLowerCase().includes("already")) {
          setTimeout(() => {
            router.push("/customerAccount/profile");
          }, 2000);
        }
      }
    } catch (error) {
      setMessage("User already exist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isError =
    message.toLowerCase().includes("already") ||
    message.toLowerCase().includes("wrong") ||
    message.toLowerCase().includes("invalid") ||
    message.toLowerCase().includes("must");

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          required
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          required
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-200 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "CREATE ACCOUNT"}
      </button>

      {/* Forgot Password Link */}
      <div className="text-center mt-4">
        <a href="/authentication/forgot-password" className="text-red-600 hover:text-red-700">
          Forgot Password?
        </a>
      </div>

      {/* Status Message */}
      {message && (
        <p className={`text-center mt-2 ${isError ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}