import { useThemeContext } from "../context/ThemeContext";

// Lightweight wrapper around the theme context toggle button for reuse across views
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle">
      {isDark ? "dYOz" : "dYOT"}
    </button>
  );
};

export default ThemeToggle;
