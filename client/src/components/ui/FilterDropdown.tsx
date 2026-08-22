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
      if (ref.current && !ref.current.contains(event.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        type="button"
        className="filter-dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        {value || label}
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="filter-dropdown-menu">
          <button
            type="button"
            className={!value ? "active" : ""}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            {!value && <Check size={14} />}
            <span>{label}</span>
          </button>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={value === option ? "active" : ""}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {value === option && <Check size={14} />}
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
