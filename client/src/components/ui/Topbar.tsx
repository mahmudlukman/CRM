import { Bell, ChevronDown, Search, UserRound, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/features/auth/authApi.js";
import type { RootState } from "../../redux/store.js";

const nav = [
  ["Dashboard", "/"],
  ["Leads", "/leads"],
  ["Pipeline", "/pipeline"],
  ["Contacts", "/contacts"],
  ["Follow-ups", "/follow-ups"],
];

export const Topbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signOut = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Logo />

        {/* Floating Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 bg-slate-100/80 border border-slate-200/60 rounded-2xl shadow-xs backdrop-blur-md">
          {nav.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              end={href === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-cyan-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions & Profile Dropdown */}
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          {/* Quick Action Buttons */}
          <button
            type="button"
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
          </button>

          <div className="h-6 w-px bg-slate-200/80 mx-1" />

          {/* User Avatar Button */}
          <button
            type="button"
            className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer"
            onClick={() => setOpen((value) => !value)}
            aria-label="Account menu"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-xs">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-60 origin-top-right rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 p-2 space-y-1 transition-all duration-150 animate-in fade-in-50 zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 space-y-0.5">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-[11px] text-slate-500 truncate font-normal">
                  {user?.email || "alex@timetoprogram.com"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
              >
                <UserRound size={15} className="text-slate-400" />
                <span>Profile & settings</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut size={15} className="text-rose-500" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
