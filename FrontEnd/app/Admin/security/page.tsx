"use client";

import { useState } from "react";

export default function SecuritySettingsPage() {
  const [password, setPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-6">Security Settings</h1>

        {/* Password Change Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Two-Factor Authentication</h2>
          <div className="flex items-center gap-3 mt-2">
            <input
              id="2fa"
              type="checkbox"
              className="h-5 w-5 text-indigo-600"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <label htmlFor="2fa" className="text-gray-700">
              Enable 2FA
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Adds an extra layer of security to your account.
          </p>
        </div>

        {/* Security Tips */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Security Tips</h2>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            <li>Use strong and unique passwords</li>
            <li>Enable 2FA for sensitive operations</li>
            <li>Log out from devices you don't use</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
