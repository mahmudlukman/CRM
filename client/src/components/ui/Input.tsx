import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
  disabled?: boolean;
}

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  disabled,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <label className="text-[13px] text-slate-800 font-bold block mb-2">
        {label}
      </label>

      <div className="flex items-center border border-[#e8ebf0] rounded-[16px] px-3 bg-white focus-within:border-[#20aeea] focus-within:shadow-[0_0_0_4px_rgba(32,174,234,0.12)]">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-[#101828] placeholder:text-[#9aa3af] h-[48px] !border-0 !p-0 !shadow-none focus:!border-0 focus:!shadow-none"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="ml-2 text-[#9aa3af] hover:text-[#087fb8] flex-shrink-0"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
