import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [error, success]);

  // Handle SignUp Form Submit
  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(null);
    setIsRegistering(true);

    try {
      const res = await register({
        name: fullName,
        email,
        password,
      }).unwrap();
      if (res?.message) {
        setSuccess(res.message);
      } else {
        setSuccess("Registration successful!");
      }

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
          <h1>Launch a cleaner revenue workspace.</h1>
          <p>
            Track leads, pipeline stages, contacts, follow-ups and AI sales
            insights from one focused SaaS dashboard.
          </p>
        </div>
      </section>
      <section className="auth-panel">
        <form className="auth-form" onSubmit={handleSignUp}>
          <h2>Create account</h2>
          <p>Start your TTP CRM workspace.</p>
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

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
          {error && <p className="text-red-500 text-xs pb-2.5 py-2">{error}</p>}
          {success && (
            <p className="text-green-600 text-xs pb-2.5 py-2">{success}</p>
          )}
          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account…" : "Create account"}
          </button>
          <span className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </form>
      </section>
    </main>
  );
};

export default Register;
