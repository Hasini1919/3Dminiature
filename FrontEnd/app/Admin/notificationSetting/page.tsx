'use client';

import { useRouter } from 'next/navigation';

export default function NotificationSettingsPage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Notification Settings</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block font-medium text-indigo-800 mb-2">Email Notifications</label>
          <select className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-indigo-800 mb-2">SMS Notifications</label>
          <select className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-indigo-800 mb-2">Admin Alerts</label>
          <input
            type="checkbox"
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />{' '}
          <span className="ml-2 text-indigo-700">Receive critical admin alerts via email</span>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
