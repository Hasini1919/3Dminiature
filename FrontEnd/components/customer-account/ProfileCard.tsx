"use client";

import { formatBirthday } from "@/utils/dateUtils";
import { FaSpinner } from "react-icons/fa";

interface ProfileFieldBoxProps {
  label: string;
  value: string;
  placeholder: string;
}

function ProfileFieldBox({ label, value, placeholder }: ProfileFieldBoxProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600 dark:text-gray-400">{label}</label>
      <div className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-2 text-sm text-gray-900 dark:text-white min-h-[36px] flex items-center">
        {value || (
          <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
        )}
      </div>
    </div>
  );
}

interface UserProfile {
  name: string;
  email: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
}

interface ProfileCardProps {
  userData: UserProfile;
  onEdit: () => void;
}

export function ProfileCard({ userData, onEdit }: ProfileCardProps) {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ProfileFieldBox
          label="Full Name"
          value={userData.name}
          placeholder="Enter your name"
        />
        <ProfileFieldBox
          label="Email Address"
          value={userData.email}
          placeholder="Email not set"
        />
        <ProfileFieldBox
          label="Mobile Number"
          value={userData.mobile || ""}
          placeholder="Enter your mobile"
        />
        <ProfileFieldBox
          label="Date of Birth"
          value={formatBirthday(userData.birthday)}
          placeholder="Select your birthday"
        />
        <ProfileFieldBox
          label="Gender"
          value={userData.gender || ""}
          placeholder="Select your gender"
        />
      </div>

      <button
        onClick={onEdit}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        Edit Profile
      </button>
    </div>
  );
}