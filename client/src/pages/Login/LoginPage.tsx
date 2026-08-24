import { ShieldCheck, TrendingUp, BriefcaseBusiness } from "lucide-react";
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
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      await login({ email, password }).unwrap();
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.data?.message) {
        setError(err.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="auth-screen">
      <section className="auth-hero">
        <Logo light />
        <div className="auth-copy">
          <h1>Close more deals with an AI co-pilot in your pipeline.</h1>
          <p>
            TTP CRM unifies your leads, contacts and follow-ups — then layers
            Gemini-powered summaries, email drafts and sales insights on top.
          </p>
          <ul>
            <li>
              <TrendingUp size={18} /> Visual pipeline with drag-and-drop stages
            </li>
            <li>
              <BriefcaseBusiness size={18} /> AI lead scoring & instant email
              drafting
            </li>
            <li>
              <ShieldCheck size={18} /> Secure JWT auth, your data stays yours
            </li>
          </ul>
        </div>
        <small>© 2026 Time To Program. All rights reserved.</small>
      </section>
      <section className="auth-panel">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Welcome back</h2>
          <p>Sign in to your TTP CRM workspace.</p>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="!text-red-500 text-xs pb-2.5">{error}</p>}
          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
          <span className="auth-link">
            Don't have an account? <Link to="/register">Create one</Link>
          </span>
        </form>
      </section>
    </main>
  );
}
