import { Bell, ChevronDown, Search, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo.jsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../@types/index.js";
import { useLogoutMutation } from "../../redux/features/auth/authApi.js";

const nav = [
  ["Dashboard", "/"],
  ["Leads", "/leads"],
  ["Pipeline", "/pipeline"],
  ["Contacts", "/contacts"],
  ["Follow-ups", "/follow-ups"],
];

export const Topbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout({}).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Logo />
        <nav className="nav-pill hidden md:flex">
          {nav.map(([label, href]) => (
            <NavLink key={href} to={href} end={href === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="icon-button" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="icon-button relative" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-500" />
          </button>
          <button
            className="avatar-button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Account menu"
          >
            <span>{user?.name?.[0] || "A"}</span>
            <ChevronDown size={16} />
          </button>
          {open && (
            <div className="account-menu">
              <p>{user?.email || "alex@timetoprogram.com"}</p>
              <button onClick={() => navigate("/settings")}>
                <UserRound size={16} /> Profile & settings
              </button>
              <button className="text-rose-600" onClick={signOut}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
