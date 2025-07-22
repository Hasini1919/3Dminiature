"use client";

import { useState } from "react";
import { AddressFields, AddressData } from "./AddressFields";
import { FaSpinner } from "react-icons/fa";

interface EditAddressFormProps {
  addressData: AddressData;
  onCancel: () => void;
  onSave: (data: AddressData) => Promise<void> | void;
  saving?: boolean;
}

export function EditAddressForm({ 
  addressData, 
  onCancel, 
  onSave,
  saving = false
}: EditAddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({ 
    ...addressData,
    country: addressData.country || 'United States' // Default value
  });
  const [errors, setErrors] = useState<Partial<AddressData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof AddressData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClear = (field: keyof AddressData) => {
    setFormData(prev => ({ ...prev, [field]: '' }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddressData> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.houseNo.trim()) {
      newErrors.houseNo = "House number is required";
      isValid = false;
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.postalCode)) {
      newErrors.postalCode = "Invalid postal code";
      isValid = false;
    }

    // Add more validations as needed

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AddressFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onClear={handleClear}
      />

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          {saving && <FaSpinner className="animate-spin" />}
          {saving ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  );
}