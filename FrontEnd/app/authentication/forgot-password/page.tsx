"use client";

import { useState } from "react";
import { forgotPassword } from "@/utils/auth-utils/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await forgotPassword(email);
            setMessage(response.message || "Password reset email sent. Please check your inbox.");
        } catch (error: any) {
            console.error("Forgot password error:", error);
            setMessage(error.message || "Error sending reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                            required
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                    {message && (
                        <p className={`text-center mt-2 ${
                            message.includes("Error") ? "text-red-500" : "text-green-500"
                        }`}>
                            {message}
                        </p>
                    )}

                    <div className="text-center mt-4">
                        <a href="/authentication/login" className="text-red-600 hover:text-red-700">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
} 