"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth-utils/api";
import { Eye, EyeOff } from "lucide-react"; 

export default function LoginForm() {
    const [formData, setFormData] = useState({
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

        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await login(formData.email, formData.password);
            if (response.token) {
                router.push("/About");
            }
        } catch (error: any) {
            setMessage(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? "Logging in..." : "LOGIN"}
            </button>

            <div className="text-center mt-4">
                <a href="/authentication/forgot-password" className="text-red-600 hover:text-red-700">
                    Forgot Password?
                </a>
            </div>

            {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </form>
    );
}
