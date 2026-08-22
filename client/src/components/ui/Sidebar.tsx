import {
  CalendarDays,
  ContactRound,
  FileText,
  LayoutGrid,
  LogOut,
  Settings,
  SquareKanban,
  UsersRound,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const items: Array<[typeof LayoutGrid, string]> = [
  [LayoutGrid, "/"],
  [UsersRound, "/leads"],
  [ContactRound, "/contacts"],
  [SquareKanban, "/pipeline"],
  [FileText, "/notes"],
  [CalendarDays, "/follow-ups"],
  [Settings, "/settings"],
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <aside className="fixed bottom-0 left-0 z-30 flex h-16 w-full items-center justify-around border-t border-line bg-white/95 backdrop-blur lg:bottom-auto lg:top-28 lg:h-[calc(100vh-9rem)] lg:w-16 lg:flex-col lg:border-r lg:border-t-0">
      <div className="flex items-center gap-2 lg:flex-col lg:gap-5">
        {items.map(([Icon, href]) => (
          <NavLink
            className="side-link"
            to={href}
            key={href}
            end={href === "/"}
          >
            <Icon size={21} />
          </NavLink>
        ))}
      </div>
      <button
        className="side-link hidden lg:flex"
        onClick={() => {
          logout();
          navigate("/login");
        }}
        aria-label="Log out"
      >
        <LogOut size={21} />
      </button>
    </aside>
  );
};
