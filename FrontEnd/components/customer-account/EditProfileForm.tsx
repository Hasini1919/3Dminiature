"use client";

import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { months, daysInMonth } from "@/utils/dateUtils";

interface UserProfile {
  name: string;
  email: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
}

interface FormErrors {
  fields: Partial<UserProfile>;
  form?: {
    message: string;
  };
}

interface EditProfileFormProps {
  userData: UserProfile;
  onCancel: () => void;
  onSave: (data: UserProfile) => Promise<void>;
  saving?: boolean;
}

export function EditProfileForm({
  userData,
  onCancel,
  onSave,
  saving = false,
}: EditProfileFormProps) {
  const [form, setForm] = useState<UserProfile>({ ...userData });
  const [errors, setErrors] = useState<FormErrors>({ fields: {} });
  const [availableDays, setAvailableDays] = useState<number[]>([]);

  useEffect(() => {
    setForm({ ...userData });
  }, [userData]);

  // Parse birthday or use current date as default
  const initialDate = form.birthday ? new Date(form.birthday) : new Date();
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(initialDate.getDate());

  // Update available days when month/year changes
  useEffect(() => {
    const days = daysInMonth(selectedMonth + 1, selectedYear);
    setAvailableDays(Array.from({ length: days }, (_, i) => i + 1));
    if (selectedDay > days) {
      setSelectedDay(days);
    }
    handleDateChange();
  }, [selectedMonth, selectedYear]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors.fields[name as keyof UserProfile]) {
      setErrors(prev => ({
        ...prev,
        fields: { ...prev.fields, [name]: undefined }
      }));
    }
  };

  const handleDateChange = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    setForm(prev => ({
      ...prev,
      birthday: newDate.toISOString().slice(0, 10)
    }));
  };

  const validateForm = (): boolean => {
    const fieldErrors: Partial<UserProfile> = {};

    if (!form.name.trim()) {
      fieldErrors.name = "Name is required";
    }

    if (form.mobile && !/^[0-9]{10,15}$/.test(form.mobile)) {
      fieldErrors.mobile = "Invalid mobile number";
    }

    setErrors({ fields: fieldErrors });
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSave(form);
    } catch (error) {
      console.error("Save failed:", error);
      setErrors(prev => ({
        ...prev,
        form: { message: "Failed to save profile. Please try again." }
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            placeholder="Enter your name"
          />
          {errors.fields.name && <p className="text-sm text-red-500">{errors.fields.name}</p>}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            name="email"
            value={form.email}
            className="input bg-gray-200 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium mb-1">Mobile Number</label>
          <input
            name="mobile"
            value={form.mobile || ""}
            onChange={handleChange}
            className="input"
            placeholder="Enter your mobile number"
          />
          {errors.fields.mobile && <p className="text-sm text-red-500">{errors.fields.mobile}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={form.gender || ""}
            onChange={handleChange}
            className="input"
          >
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
            value={form.birthday || ""}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      {errors.form?.message && (
        <p className="text-red-500 text-sm">{errors.form.message}</p>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-md transition-colors duration-200 disabled:opacity-70"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {saving && <FaSpinner className="animate-spin" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}