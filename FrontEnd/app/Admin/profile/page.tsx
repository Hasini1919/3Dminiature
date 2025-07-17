"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const router = useRouter();

  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Handle file input change
  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle sending updated data (including profilePic) to backend
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Profile Settings</h1>
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <label className="mb-3 text-indigo-700 font-semibold">Profile Picture</label>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 bg-indigo-100 cursor-pointer hover:ring-4 hover:ring-indigo-400 transition">
            {profilePic ? (
              <img src={profilePic} alt="Profile Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-indigo-500">
                <span>No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload profile picture"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Click above to upload profile picture</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Submit */}
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
