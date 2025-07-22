"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Sidebar from "@/components/customer-account/Sidebar";
const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Apply theme to HTML root element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen p-5 gap-5 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Settings Section */}
      <main className="flex-1 p-5 border-2 border-red-500 dark:border-red-300 rounded-lg shadow-md dark:shadow-gray-800">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="mt-5 space-y-6">
          {/* Appearance */}
          <div>
            <label className="font-semibold block">Appearance</label>
            <select
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

         

          {/* Notification Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p>Push Notifications</p>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="w-5 h-5 accent-red-500 focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <p>Email Notifications</p>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="w-5 h-5 accent-red-500 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;