import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, toggleTodo, deleteTodo, editTodo } from "./features/todos/todosSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
const App = () => {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const editInputRef = useRef(null);

  const { items, loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTodo({ title, completed: false }));
    setTitle("");
  };

  const handleEditSave = (id) => {
    if (!editTitle.trim()) return;
    dispatch(editTodo({ id, title: editTitle }));
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Todo App</h1>

     
          <form onSubmit={handleAdd} className="d-flex mb-3">
            <input
              className="form-control me-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add todo"
            />
            <button className="btn btn-primary">Add</button>
          </form>

          {loading ? (
            <p className="text-center text-muted">Loading...</p>
          ) : (
            <ul className="list-group">
              {items.map((todo) => (
                <li
                  key={todo.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {editingId === todo.id ? (
                      <input
                        ref={editInputRef}
                        className="form-control"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEditSave(todo.id);
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => dispatch(toggleTodo(todo))}
                        style={{
                          textDecoration: todo.completed ? "line-through" : "none",
                          cursor: "pointer",
                        }}
                      >
                        {todo.title}
                      </span>
                    )}
                  </div>

                  <div>
                    {editingId === todo.id ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEditSave(todo.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditTitle(todo.title);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
