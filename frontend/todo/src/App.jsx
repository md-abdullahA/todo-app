import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "./features/todos/todosSlice";

const App = () => {
  const [title, setTitle] = useState("");
  const { items, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTodo({ title, completed: false }));
    setTitle("");
  };

  return (
    <div >
      <h1 >Todo App</h1>

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}

          placeholder="Add todo"
        />
        <button >Add</button>
      </form>

      {loading ? (
        <p >Loading...</p>
      ) : (
        <ul>
          {items.map((todo) => (
            <li key={todo.id} >
              <span
                onClick={() => dispatch(toggleTodo(todo))}

              >
                {todo.title}
              </span>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
