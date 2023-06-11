import React from 'react';

import { ITodo } from '../types/todo';

interface ITodoItemProps extends ITodo {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = (props) => {
  const { id, name, completed, toggleTodo, removeTodo } = props;

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)}></input>
      <span>{name}</span>
      <button onClick={() => removeTodo(id)}>x</button>
    </div>
  );
};
