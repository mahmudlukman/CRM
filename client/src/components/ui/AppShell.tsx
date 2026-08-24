import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Topbar />
      <Sidebar />
      <main className="mx-auto w-full max-w-[1320px] px-4 pb-12 pt-24 sm:px-6 lg:pl-24 lg:pr-8">
        <Outlet />
      </main>
    </div>
  );
};
