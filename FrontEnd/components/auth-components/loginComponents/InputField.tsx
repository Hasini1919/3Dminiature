import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full relative">
      <label className="block text-gray-700 font-semibold">{label}</label>
      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 pr-10 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#8b4513] outline-none"
        required
      />

      {/* Show/hide button only if it's a password field */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default InputField;