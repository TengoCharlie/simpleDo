import { createContext, useContext, useState, useEffect } from "react";
import { todoApi } from "../services/api";

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
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoApi.getAllTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // CRUD Operations
  const addTodo = async (title, content) => {
    try {
      const newTodo = await todoApi.addTodo({
        title,
        content,
      });
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, updates);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const updatedTodo = await todoApi.updateTodo(id, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
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
