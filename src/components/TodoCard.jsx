import { useState, useEffect, useRef } from "react";
import { useTodoContext } from "../context/TodoContext";

const TodoCard = ({ todo }) => {
  // useState Hook: Manages the editing state and form values
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedContent, setEditedContent] = useState(todo.content);

  // useRef Hook: References the card for click outside detection
  const cardRef = useRef(null);

  // useContext Hook: Accessing the todo context
  const { updateTodo, deleteTodo, toggleComplete } = useTodoContext();

  // useEffect Hook: Handles click outside to save edits
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, editedTitle, editedContent]);

  const handleSave = () => {
    if (editedTitle.trim() || editedContent.trim()) {
      updateTodo(todo.id, {
        title: editedTitle.trim(),
        content: editedContent.trim(),
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      ref={cardRef}
      className={`todo-card ${todo.completed ? "completed" : ""}`}
    >
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
            className="edit-input title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Content"
            className="edit-input content"
          />
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="todo-header">
            <h3>{todo.title}</h3>
            <div className="todo-actions">
              <button
                onClick={() => toggleComplete(todo.id)}
                className="action-btn"
              >
                {todo.completed ? "✓" : "○"}
              </button>
              <button onClick={() => setIsEditing(true)} className="action-btn">
                ✎
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="action-btn delete"
              >
                ×
              </button>
            </div>
          </div>
          <p className="todo-content">{todo.content}</p>
          <small className="todo-date">{formatDate(todo.createdAt)}</small>
        </>
      )}
    </div>
  );
};

export default TodoCard;
