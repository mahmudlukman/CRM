import { Outlet } from "react-router-dom";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export const AppShell = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 font-sans antialiased relative selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Layer */}
      <Topbar />
      <Sidebar />

      {/* Main Workspace Canvas */}
      <main className="mx-auto w-full max-w-[1320px] px-4 pb-12 pt-24 sm:px-6 lg:pl-28 lg:pr-8 transition-all duration-300">
        <div className="w-full h-full min-h-[calc(100vh-7rem)] rounded-2xl bg-white/70 border border-slate-200/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
