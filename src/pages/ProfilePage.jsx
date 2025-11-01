import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, updateProfile, authError, logout } = useAuthContext();
  const [formState, setFormState] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (formState.password && formState.password !== formState.confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    const payload = {};

    if (formState.name && formState.name !== user?.name) {
      payload.name = formState.name;
    }

    if (formState.email && formState.email !== user?.email) {
      payload.email = formState.email;
    }

    if (formState.password) {
      if (!formState.currentPassword) {
        setFormError("Enter your current password to set a new one.");
        return;
      }

      payload.currentPassword = formState.currentPassword;
      payload.password = formState.password;
    }

    if (Object.keys(payload).length === 0) {
      setSuccessMessage("Your profile is already up to date.");
      return;
    }

    setSubmitting(true);

    try {
      await updateProfile(payload);
      setSuccessMessage("Profile updated successfully.");
      setFormState((prev) => ({
        ...prev,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      // Error displayed below via authError
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Account settings</h1>
          {user && (
            <p className="app-subtitle">Manage your personal information below.</p>
          )}
        </div>
        <div className="app-header-actions">
          <ThemeToggle />
          <Link to="/" className="inline-link">
            Back to todos
          </Link>
          <button type="button" className="link-button" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <section className="auth-card">
        {formError && <p className="error-message">{formError}</p>}
        {authError && <p className="error-message">{authError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="currentPassword">Current password</label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formState.currentPassword}
            onChange={handleInputChange}
            placeholder="Required when setting a new password"
          />

          <label htmlFor="password">New password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleInputChange}
            placeholder="Leave blank to keep your current password"
            minLength={6}
          />

          <label htmlFor="confirmPassword">Confirm new password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formState.confirmPassword}
            onChange={handleInputChange}
            minLength={6}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
