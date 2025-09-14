import React, { useState, useEffect } from 'react';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import SearchBox from '../components/SearchBox';
import Stats from '../components/Stats';
import { Todo } from '../types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      
      if (!response.ok) {
        throw new Error('Todos getirilemedi');
      }
      
      const backendTodos = await response.json();
      
      const formattedTodos = backendTodos.map((todo: any) => ({
        ...todo,
        completed: false,
        createdAt: new Date(),
      }));
      
      setTodos(formattedTodos);
    } catch (error) {
      console.error('Todos yüklenemedi:', error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Todo eklenemedi');
      }

      const newBackendTodo = await response.json();

      const newTodo: Todo = {
        ...newBackendTodo,
        completed: false,
        createdAt: new Date(),
      };

      setTodos([newTodo, ...todos]);
      
    } catch (error) {
      console.error('Todo eklenemedi:', error);
      alert('Todo eklenirken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Todo silinemedi');
      }

      setTodos(todos.filter(todo => todo.id !== id));
      
    } catch (error) {
      console.error('Todo silinemedi:', error);
      alert('Todo silinirken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter(todo =>
    searchText === '' || todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto py-6">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            📝 Todo List {loading && <span className="text-sm text-blue-500">(Yükleniyor...)</span>}
          </h1>
        </div>

        <AddTodo onAdd={addTodo} disabled={loading} />
        
        {todos.length > 0 && (
          <>
            <SearchBox 
              searchText={searchText}
              onSearchTextChange={setSearchText}
            />
            
            <Stats todos={todos} filteredTodos={filteredTodos} />
          </>
        )}

        <div>
          {filteredTodos.length === 0 ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl text-gray-500 mb-2">
                {todos.length === 0 ? 'Henüz görev yok' : 'Arama sonucu bulunamadı'}
              </h3>
              <p className="text-gray-400">
                {todos.length === 0 ? 'İlk görevini ekleyerek başla!' : 'Farklı terimler deneyebilirsin'}
              </p>
              {loading && (
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              )}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                disabled={loading}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}