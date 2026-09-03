import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center justify-between gap-2.5 h-10 px-3.5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer ${
          value
            ? "bg-cyan-50/80 border-cyan-500/30 text-cyan-900 shadow-xs"
            : "bg-white/80 border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="truncate max-w-[140px]">{value || label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180 text-slate-600" : ""
          }`}
        />
      </button>

      {/* Menu Overlay */}
      {open && (
        <div className="absolute right-0 sm:left-0 mt-2 min-w-[180px] z-50 p-1.5 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
          {/* Default / Reset Option */}
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              !value
                ? "bg-cyan-50 text-cyan-700 font-semibold"
                : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
            }`}
          >
            <span>{label}</span>
            {!value && <Check size={14} className="text-cyan-600 shrink-0" />}
          </button>

          <div className="my-1 border-t border-slate-100" />

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {options.map((option) => {
              const isSelected = value === option;
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-cyan-50 text-cyan-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <Check size={14} className="text-cyan-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
