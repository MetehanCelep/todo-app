interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface StatsProps {
  todos: Todo[];
  filteredTodos: Todo[];
}

export default function Stats({ todos, filteredTodos }: StatsProps) {
  const completedCount = todos.filter(todo => todo.completed).length;
  
  return (
    <div className="flex space-x-4 mb-6">
      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
        <span className="text-sm text-gray-600">Toplam: </span>
        <span className="font-semibold text-gray-800">{filteredTodos.length}</span>
      </div>
      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
        <span className="text-sm text-gray-600">Aktif: </span>
        <span className="font-semibold text-blue-600">{filteredTodos.filter(t => !t.completed).length}</span>
      </div>
      <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
        <span className="text-sm text-gray-600">Tamamlanan: </span>
        <span className="font-semibold text-green-600">{completedCount}</span>
      </div>
    </div>
  );
}