import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setTitle("");
  }

  async function toggleTodo(todo) {
    const res = await fetch(`${API}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === todo.id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
  

    <div className="container mx-auto max-w-lg mt-12 p-6 bg-white rounded-2xl shadow-lg">
  <h1 className="text-3xl font-bold text-center mb-6">📝 To-Do List</h1>

  <form 
    onSubmit={addTodo} 
    className="flex gap-2 mb-6"
  >
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter a task"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
    >
      Add
    </button>
  </form>

  <ul className="space-y-3">
    {todos.map((todo) => (
      <li
        key={todo.id}
        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo)}
            className="w-5 h-5 accent-blue-500"
          />
          <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}>
            {todo.title}
          </span>
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 transition-colors font-bold"
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default App;
