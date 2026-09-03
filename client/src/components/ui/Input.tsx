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
  const isPassword = type === "password";

  return (
    <div className="w-full space-y-2">
      <label className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
        {label}
      </label>

      <div className="relative flex items-center rounded-xl bg-slate-950/60 border border-slate-800 transition-all duration-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full h-11 px-4 bg-transparent outline-none text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-50"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            className="pr-4 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
