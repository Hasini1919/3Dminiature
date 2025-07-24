"use client";

import { ChangeEvent } from "react";
import { months, daysInMonth } from "@/utils/dateUtils";

export interface ProfileData {
  name: string;
  email: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
}

interface ProfileFieldsProps {
  data: ProfileData;
  errors: Partial<ProfileData>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function ProfileFields({ data, errors, onChange }: ProfileFieldsProps) {
  const currentDate = data.birthday ? new Date(data.birthday) : new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const availableDays = Array.from({ length: daysInMonth(month + 1, year) }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="name"
          value={data.name}
          onChange={onChange}
          className="input"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email (disabled) */}
      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          name="email"
          value={data.email}
          className="input bg-gray-200 cursor-not-allowed"
          disabled
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <input
          name="mobile"
          value={data.mobile || ""}
          onChange={onChange}
          className="input"
          placeholder="Enter mobile number"
        />
        {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select name="gender" value={data.gender || ""} onChange={onChange} className="input">
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Birthday */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          name="birthday"
          value={data.birthday || ""}
          onChange={onChange}
          className="input"
        />
      </div>
    </div>
  );
}