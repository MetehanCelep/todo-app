import { useState } from "react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 rounded w-64"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Yeni görev ekle"
      />
      <button
        onClick={handleAdd}
        disabled={!input.trim()}
        className={`px-3 py-2 rounded text-white ${
          !input.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Ekle
      </button>
    </div>
  );
}
