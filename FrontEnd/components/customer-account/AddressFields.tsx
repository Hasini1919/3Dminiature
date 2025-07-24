"use client";

import { FaTimes } from "react-icons/fa";

export interface AddressData {
  _id?: string;
  firstName: string;
  lastName: string;
  province: string;
  district: string;
  city: string;
  area: string;
  houseNo: string;
  postalCode: string;
  country: string;
  anyInformation?: string;
  isDefault?: boolean;
}

interface AddressFieldsProps {
  formData: AddressData;
  errors?: Partial<AddressData>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClear: (field: keyof AddressData) => void;
}

interface AddressFieldConfig {
  label: string;
  name: keyof AddressData;
  type: string;
  required: boolean;
}

export function AddressFields({
  formData,
  errors = {},
  onChange,
  onClear,
}: AddressFieldsProps) {
  const fieldConfigs: AddressFieldConfig[] = [
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Province", name: "province", type: "text", required: true },
    { label: "District", name: "district", type: "text", required: true },
    { label: "City", name: "city", type: "text", required: true },
    { label: "Area", name: "area", type: "text", required: true },
    { label: "House No", name: "houseNo", type: "text", required: true },
    { label: "Postal Code", name: "postalCode", type: "text", required: false },
    { label: "Country", name: "country", type: "text", required: true },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fieldConfigs.map(({ label, name, type, required }) => (
          <div key={name} className="relative">
            <label className="block text-sm font-medium mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <input
                type={type}
                name={name}
                value={formData[name] as string}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                } ${required ? "bg-white" : "bg-gray-50"}`}
                required={required}
              />
              {formData[name] && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => onClear(name)}
                  aria-label={`Clear ${label}`}
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Additional Information
        </label>
        <textarea
          name="anyInformation"
          value={formData.anyInformation || ""}
          onChange={onChange}
          placeholder="Any special instructions (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
    </div>
  );
}