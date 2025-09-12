import { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import AddTodo from "../components/AddTodo";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) =>
        setTodos(data.map((t: any) => ({ ...t, completed: false })))
      );
  }, []);

  const addTodo = async (text: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const newTodo = await res.json();
      setTodos([...todos, { ...newTodo, completed: false }]);
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setTodos(todos.filter((t) => t.id !== id));
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">📝 To-Do List</h1>

      <div className="flex gap-4 w-full max-w-3xl mb-6">
        <div className="flex-1">
          <AddTodo onAdd={addTodo} />
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex gap-2">
            <input
              type="number"
              className="border p-2 rounded flex-1"
              placeholder="ID ile ara"
              disabled
            />
            <button
              disabled
              className="px-4 py-2 rounded text-white bg-gray-400 cursor-not-allowed"
            >
              Ara
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Ad ile ara"
              disabled
            />
            <button
              disabled
              className="px-4 py-2 rounded text-white bg-gray-400 cursor-not-allowed"
            >
              Ara
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
