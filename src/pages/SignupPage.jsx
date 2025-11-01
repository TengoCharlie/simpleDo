import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthContext } from "../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, token, authError } = useAuthContext();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      await register({
        name: formState.name,
        email: formState.email,
        password: formState.password,
      });
      navigate("/");
    } catch (error) {
      // Error surfaced via authError
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app auth-view">
      <header className="app-header">
        <h1>SimpleDo - React Todo App</h1>
        <ThemeToggle />
      </header>
      <section className="auth-card">
        <h2>Create Account</h2>
        {formError && <p className="error-message">{formError}</p>}
        {authError && <p className="error-message">{authError}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formState.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formState.password}
            onChange={handleInputChange}
            required
            minLength={6}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formState.confirmPassword}
            onChange={handleInputChange}
            required
            minLength={6}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="inline-link">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignupPage;
