import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string) => void;
  disabled?: boolean;
}

export default function AddTodo({ onAdd, disabled = false }: AddTodoProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim() || disabled) return;
    onAdd(input.trim());
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
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
          placeholder={disabled ? "Yükleniyor..." : "Yeni bir görev ekle..."}
          disabled={disabled}
          className={`flex-1 px-6 py-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400 ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim() || disabled}
          className={`m-2 p-3 rounded-xl transition-all duration-200 ${
            input.trim() && !disabled
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