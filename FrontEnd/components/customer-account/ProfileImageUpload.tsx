"use client";

import React, { useState, ChangeEvent } from "react";

interface ProfileImageUploadProps {
  userId: string;
  onUploadSuccess?: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ userId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
  if (!selectedFile) {
    setError("Please select a file first.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append("image", selectedFile); // ✅ must match multer field in backend

    const res = await fetch(`http://localhost:5500/api/profile/upload-image/${userId}`, {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await res.json(); // ✅ read only once
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setUploadedUrl(data.imageUrl);
      onUploadSuccess?.(data.imageUrl);

      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      // fallback in case response is not JSON
      const text = await res.text();
      throw new Error(text || "Upload failed");
    }
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-sm mx-auto p-4 border rounded">
      <div className="mb-4">
        <label htmlFor="profileImage" className="block font-semibold mb-2">
          Select Profile Image
        </label>
        <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} />
      </div>

      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}

      {uploadedUrl && (
        <div className="mb-4">
          <p className="text-green-600">Uploaded Image:</p>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ProfileImageUpload;