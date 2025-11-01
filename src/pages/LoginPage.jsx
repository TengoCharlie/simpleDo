import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, token, authError } = useAuthContext();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
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

    setSubmitting(true);
    try {
      await login(formState);
      navigate("/");
    } catch (error) {
      // Global authError state already captures the message for display
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
        <h2>Login</h2>
        {authError && <p className="error-message">{authError}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={formState.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-switch">
          Need an account?{" "}
          <Link to="/signup" className="inline-link">
            Create one
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
