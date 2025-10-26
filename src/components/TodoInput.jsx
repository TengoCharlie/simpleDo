import { useState, useRef, useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoInput = () => {
  // useState Hook: Manages the form input states
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useRef Hook: References the form container for click outside detection
  const formRef = useRef(null);

  // useContext Hook: Accessing the todo context through our custom hook
  const { addTodo } = useTodoContext();

  // useEffect Hook: Handles click outside the form to collapse it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (!title && !content) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content]); // Dependencies array

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      addTodo(title.trim(), content.trim());
      setTitle("");
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <div ref={formRef} className="todo-input-container">
      <form onSubmit={handleSubmit} className="todo-form">
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input title"
          />
        )}
        <input
          type="text"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={() => setIsExpanded(true)}
          className="todo-input content"
        />
        {isExpanded && (
          <button type="submit" className="add-todo-btn">
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInput;
