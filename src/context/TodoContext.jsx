import { createContext, useContext, useState, useEffect } from "react";

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
  // useState Hook: Manages the todos state
  const [todos, setTodos] = useState(() => {
    // Initialize state from localStorage if available
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // useEffect Hook: Saves todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // Dependency array: effect runs when todos change

  // CRUD Operations
  const addTodo = (title, content) => {
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString(),
        completed: false,
      },
      ...prevTodos,
    ]);
  };

  const updateTodo = (id, updates) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Value object to be provided to consumers
  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
