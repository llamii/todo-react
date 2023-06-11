import * as React from 'react';
import { TodoItem } from './TodoItem';
import { ITodo } from '../types/todo';
import { useRef, useState, useEffect } from 'react';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
    const storedTodos = localStorage.getItem('todos');
    console.log('first: ', storedTodos);
    if (storedTodos) {
      console.log('second: ', JSON.parse(storedTodos));
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (value) {
      const newTodo = {
        id: Date.now(),
        name: value,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input value={value} onKeyDown={handleKeyDown} onChange={handleChange} ref={inputRef}></input>
      {todos.map((todo) => (
        <TodoItem toggleTodo={toggleTodo} removeTodo={removeTodo} key={todo.id} {...todo} />
      ))}
    </div>
  );
};
