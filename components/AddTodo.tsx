import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Yeni bir görev ekle..."
          className="flex-1 px-6 py-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className={`m-2 p-3 rounded-xl transition-all duration-200 ${
            input.trim()
              ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:scale-105'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}