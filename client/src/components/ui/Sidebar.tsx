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
import { useLogoutMutation } from "../../redux/features/auth/authApi";

interface NavItem {
  icon: typeof LayoutGrid;
  href: string;
  label: string;
}

const items: NavItem[] = [
  { icon: LayoutGrid, href: "/", label: "Dashboard" },
  { icon: UsersRound, href: "/leads", label: "Leads" },
  { icon: ContactRound, href: "/contacts", label: "Contacts" },
  { icon: SquareKanban, href: "/pipeline", label: "Pipeline" },
  { icon: FileText, href: "/notes", label: "Notes" },
  { icon: CalendarDays, href: "/follow-ups", label: "Follow-ups" },
  { icon: Settings, href: "/settings", label: "Settings" },
];

export const Sidebar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="fixed bottom-0 left-0 z-30 flex h-16 w-full items-center justify-around bg-white/80 backdrop-blur-xl border-t border-slate-200/80 px-2 lg:bottom-auto lg:top-28 lg:h-[calc(100vh-9rem)] lg:w-20 lg:flex-col lg:justify-between lg:border-r lg:border-t-0 lg:py-6">
      <nav className="flex items-center gap-1.5 sm:gap-3 lg:flex-col lg:gap-3 w-full justify-around lg:justify-start">
        {items.map(({ icon: Icon, href, label }) => (
          <NavLink
            to={href}
            key={href}
            end={href === "/"}
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `relative group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-600 font-medium shadow-xs"
                  : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />

                {/* Active Indicator Bar for Desktop */}
                {isActive && (
                  <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-600 rounded-r-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={signOut}
        aria-label="Log out"
        title="Log out"
        className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
      >
        <LogOut size={20} strokeWidth={1.8} />
      </button>
    </aside>
  );
};
