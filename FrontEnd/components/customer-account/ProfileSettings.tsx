"use client";

import React from "react";
import ProfileImageUpload from "./ProfileImageUpload"; // Adjust path if needed
import { useSession } from "next-auth/react";

interface ProfileSettingsProps {
  onClose: () => void;
  onImageUpload?: (url: string) => void; // Optional callback for image upload success
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onClose, onImageUpload }) => {
  const { data: session } = useSession(); // Get session to access user ID

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The actual image upload happens inside <ProfileImageUpload />
    onClose(); // Close the modal or drawer after saving
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>

      {/* Profile image upload component handles uploading itself */}
      <ProfileImageUpload
        userId={session?.user?.id || ""}
        onUploadSuccess={(filename: string) => {
          const fullUrl = `/uploads/${filename}`;
          onImageUpload?.(fullUrl); // Pass to parent if callback provided
        }}
      />

      <div className="mt-4 flex">
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileSettings;