import { useEffect } from "react";
import Todo from "./todo/Todo";
import { TodoForm } from "./TodoForm";

const API_URI = import.meta.env.VITE_API_URI;
const Todos = ({ todos, setTodos }) => {
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`${API_URI}/task`);
      const json = await res.json();
      setTodos(json.data);
    };
    getTodos();
  }, [setTodos]);

  const onClickDelete = async (id) => {
    try {
      const res = await fetch(`${API_URI}/task/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TodoForm setTodos={setTodos}></TodoForm>
      {/* Task List */}
      {todos &&
        todos.map((obj) => (
          <Todo
            key={obj._id}
            id={obj._id}
            title={obj.title}
            description={obj.description}
            priority={obj.priority}
            dueDate={obj.dueDate}
            status={obj.status}
            setTodos={setTodos}
            onClickDelete={onClickDelete}
          />
        ))}
    </>
  );
};

export default Todos;
