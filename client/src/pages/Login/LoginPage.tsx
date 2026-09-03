import {
  ShieldCheck,
  TrendingUp,
  BriefcaseBusiness,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../components/ui/Logo.js";
import { useLoginMutation } from "../../redux/features/auth/authApi.js";
import Input from "../../components/ui/Input.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  // Auto clear error after 5s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle Login Form Submit
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      await login({ email, password }).unwrap();
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-950 font-sans antialiased text-slate-100">
      {/* Left Column - Hero Branding & Visual Canvas */}
      <section className="lg:col-span-6 xl:col-span-7 relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 border-r border-slate-800/60">
        {/* Subtle Ambient Light Effects */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <Logo light />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-xl my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-cyan-400 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Sales Co-Pilot</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Close more deals with an AI co-pilot in your pipeline.
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            TTP CRM unifies your leads, contacts, and follow-ups—then layers
            Gemini-powered summaries, email drafts, and sales insights on top.
          </p>

          {/* Value Props Feature List */}
          <ul className="space-y-4 border-t border-slate-800/80 pt-8">
            <li className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>Visual pipeline with drag-and-drop stages</span>
            </li>

            <li className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                <BriefcaseBusiness className="w-4 h-4" />
              </div>
              <span>AI lead scoring & instant email drafting</span>
            </li>

            <li className="flex items-center gap-3 text-slate-300 text-sm">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Secure JWT auth—your data stays yours</span>
            </li>
          </ul>
        </div>

        {/* Footer Credit */}
        {/* <div className="relative z-10 text-xs text-slate-400">
          © {new Date().getFullYear()} Time To Program. All rights reserved.
        </div> */}
      </section>

      {/* Right Column - Authentication Panel */}
      <section className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-slate-900/50 backdrop-blur-xl">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo Fallback */}
          <div className="flex lg:hidden justify-center mb-6">
            <Logo light />
          </div>

          {/* Header */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-sm text-slate-400">
              Sign in to access your TTP CRM workspace.
            </p>
          </div>

          {/* Notification / Error Toast */}
          {error && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@company.com"
              type="email"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Signing in…</span>
                </div>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
                >
                  Create one
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
