import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  isTextArea = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-600 focus:border-emerald-600 resize-none"
          rows={3}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-600 focus:border-emerald-600"
        />
      )}
    </div>
  );
};

export default InputField;
