'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Admin {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  phone?: string;
}

export default function ProfileSettings() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Function to load profile data from backend
  const loadProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/admin/profile');
      const data = res.data;
      setAdmin(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone || '');

      // Update preview only if no local image file is selected
      if (!image) {
        setPreview(`http://localhost:5500/${data.picture?.replace(/^src\//, '')}?t=${Date.now()}`);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (password) formData.append('password', password);
    if (image) formData.append('picture', image);

    try {
      await axios.put('http://localhost:5500/api/admin/profile', formData);
      setSuccessMsg('Updated successfully');

      // After update, reload profile data (this will update preview with new image URL + timestamp)
      setImage(null); // Clear local image file so that loadProfile updates preview
      await loadProfile();

      // Clear password input
      setPassword('');

      // Navigate back after delay so user can see success message
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      setErrorMsg('Update failed. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Profile Settings</h1>
        <button onClick={() => router.back()} className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="mb-3 text-indigo-700 font-semibold">Profile Picture</label>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 bg-indigo-100 cursor-pointer hover:ring-4 hover:ring-indigo-400 transition">
            {preview ? (
              <img src={preview} alt="Profile Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-indigo-500">
                <span>No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Click above to upload new profile picture</p>
        </div>

        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-indigo-700 font-semibold mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-indigo-700 font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-indigo-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Save Changes
        </button>

        {successMsg && <p className="mt-2 text-green-600 font-semibold">{successMsg}</p>}
        {errorMsg && <p className="mt-2 text-red-600 font-semibold">{errorMsg}</p>}
      </form>
    </div>
  );
}
