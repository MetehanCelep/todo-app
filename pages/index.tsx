import React, { useState } from 'react';
import { Search, Plus, Trash2, Check, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

interface StatsProps {
  todos: Todo[];
  filteredTodos: Todo[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
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
                #{todo.id}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput('');
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
};

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchTextChange }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="Görevlerinizde arama yapın..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
        {searchText && (
          <button
            onClick={() => onSearchTextChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

const Stats: React.FC<StatsProps> = ({ todos, filteredTodos }) => {
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
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchText, setSearchText] = useState('');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo =>
    searchText === '' || todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Todo List
          </h1>
          <p className="text-gray-600">
            Görevlerinizi organize edin
          </p>
        </div>

        <AddTodoForm onAdd={addTodo} />

        {todos.length > 0 && (
          <>
            <SearchBar 
              searchText={searchText}
              onSearchTextChange={setSearchText}
            />
            
            <Stats todos={todos} filteredTodos={filteredTodos} />
          </>
        )}

        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                {todos.length === 0 ? 'Henüz görev yok' : 'Arama sonucu bulunamadı'}
              </h3>
              <p className="text-gray-400">
                {todos.length === 0 ? 'İlk görevini ekleyerek başla!' : 'Farklı terimler deneyebilirsin'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}