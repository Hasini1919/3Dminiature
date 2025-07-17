const InputField = ({ type, label, placeholder, name, value, onChange }: {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#8b4513] outline-none"
        required
      />
    </div>
  );
};

export default InputField;