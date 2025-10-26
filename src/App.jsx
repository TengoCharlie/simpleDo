import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useThemeContext } from "./context/ThemeContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeContext();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="app">
          <div className="app-header">
            <h1>SimpleDo - React Todo App</h1>
            <ThemeToggle />
          </div>
          <TodoInput />
          <TodoList />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
