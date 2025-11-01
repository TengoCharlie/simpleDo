import { createContext, useContext, useState, useEffect } from "react";
import { todoApi } from "../services/api";
import { useAuthContext } from "./AuthContext";

// Create a context for todos
export const TodoContext = createContext();

// Custom hook for using todo context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

// Provider component that wraps app and provides todo context
export const TodoProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load the authenticated user's todos whenever the token changes
  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) {
        setTodos([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await todoApi.getAllTodos(token);
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [token]);

  const ensureAuthenticated = () => {
    if (!token) {
      setError("You need to be logged in to manage todos.");
      return false;
    }
    return true;
  };

  // CRUD Operations
  const addTodo = async (title, content) => {
    if (!ensureAuthenticated()) return;

    try {
      const newTodo = await todoApi.addTodo(token, {
        title,
        content,
      });
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTodo = async (id, updates) => {
    if (!ensureAuthenticated()) return;

    try {
      const updatedTodo = await todoApi.updateTodo(token, id, updates);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id || todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    if (!ensureAuthenticated()) return;

    try {
      await todoApi.deleteTodo(token, id);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== id && todo.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    if (!ensureAuthenticated()) return;

    try {
      const todo = todos.find((t) => t._id === id || t.id === id);
      if (!todo) {
        return;
      }

      const updatedTodo = await todoApi.updateTodo(token, id, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((existingTodo) =>
          existingTodo._id === id || existingTodo.id === id
            ? updatedTodo
            : existingTodo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Value object to be provided to consumers
  const value = {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
