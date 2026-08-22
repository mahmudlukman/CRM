import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { RowMenuItem } from "../leads/types";

interface RowMenuProps {
  items: RowMenuItem[];
}

export default function RowMenu({ items }: RowMenuProps) {
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
    <div className="row-menu" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="More actions"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="row-menu-list" onClick={(e) => e.stopPropagation()}>
          {items.map((item) => (
            <button
              type="button"
              key={item.label}
              className={item.danger ? "danger" : ""}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
