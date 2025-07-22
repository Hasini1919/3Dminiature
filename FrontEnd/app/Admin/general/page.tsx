'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GeneralSettingsPage() {
  const router = useRouter();

  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBrandLogo(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form data logic (optional)
    alert('Settings saved!');
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">General Settings</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-indigo-800 mb-2">Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your brand name"
          />
        </div>

        <div>
          <label className="block font-medium text-indigo-800 mb-2">Brand Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full text-indigo-700"
          />
          {brandLogo && (
            <p className="text-sm text-gray-500 mt-1">Selected: {brandLogo.name}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-indigo-800 mb-2">Contact Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter contact email"
          />
        </div>

        <div>
          <label className="block font-medium text-indigo-800 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter phone number"
          />
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
