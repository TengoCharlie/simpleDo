import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useAuthContext } from "../context/AuthContext";
import { useTodoContext } from "../context/TodoContext";

const DashboardPage = () => {
  const { user, logout } = useAuthContext();
  const { todos, loading, error } = useTodoContext();

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>SimpleDo - React Todo App</h1>
          {user && <p className="app-subtitle">Welcome back, {user.name}</p>}
        </div>
        <div className="app-header-actions">
          <ThemeToggle />
          <Link to="/profile" className="inline-link">
            Edit profile
          </Link>
          <button type="button" className="link-button" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <TodoInput />

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="app-loading">Loading todos...</p>
      ) : (
        <TodoList />
      )}

      {!loading && todos.length === 0 && (
        <p className="empty-state">
          You do not have any todos yet. Add your first task above.
        </p>
      )}
    </div>
  );
};

export default DashboardPage;
