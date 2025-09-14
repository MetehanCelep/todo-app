import { Check, Trash2 } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void; 
  onDelete: (id: string) => void; 
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const handleDelete = () => {
    if (confirm("Bu görevi silmek istediğine emin misin?")) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`group bg-white rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {todo.completed && <Check size={12} />}
          </button>
          
          <div className="flex-1">
            <p className={`text-sm font-medium transition-all duration-200 ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}>
              {todo.text}
            </p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-gray-400">
                ID: {todo.id}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}