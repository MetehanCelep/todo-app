import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import SearchBox from '../components/SearchBox';
import Stats from '../components/Stats';
import { Todo } from '../types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchText, setSearchText] = useState('');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(), 
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => { 
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

        <AddTodo onAdd={addTodo} />
        {todos.length > 0 && (
          <>
            <SearchBox 
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