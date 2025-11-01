import { useTodoContext } from "../context/TodoContext";
import TodoCard from "./TodoCard";

const TodoList = () => {
  // useContext Hook: Accessing the todos from context
  const { todos } = useTodoContext();

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard key={todo._id || todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
