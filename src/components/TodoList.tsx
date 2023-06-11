import * as React from 'react';
import { TodoItem } from './TodoItem';
import { Filter, FilterType, ITodo } from '../types/todo';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Container } from '@mui/material';
import { styled } from 'styled-components';

import { mockTodos } from '../mock/mockTodos';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>(mockTodos);
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState<FilterType>(Filter.all);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter');
    if (storedFilter) {
      setFilter(storedFilter as FilterType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const handleChangeFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  const addTodo = (): void => {
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

  const toggleTodo = (id: number): void => {
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

  const editTodo = (id: number, name: string): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            name,
          };
        }
        return todo;
      }),
    );
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getItemsLeft = () => {
    let itemsLeft = 0;
    todos.map((todo) => {
      if (!todo.completed) {
        itemsLeft++;
      }
    });
    return itemsLeft;
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === Filter.active) {
          return !todo.completed;
        }
        if (filter === Filter.completed) {
          return todo.completed;
        }
        return true;
      }),
    [todos, filter],
  );

  return (
    <TodoListContainer maxWidth="sm">
      <Input
        placeholder="Write your todos here..."
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}></Input>

      {filteredTodos.map((todo) => (
        <TodoItem
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          removeTodo={removeTodo}
          key={todo.id}
          {...todo}
        />
      ))}
      <TodoFooter>
        <ItemsLeft>{getItemsLeft().toString()} item(s) left</ItemsLeft>
        <FilterButtons>
          <Button isActive={filter === Filter.all} onClick={() => handleChangeFilter(Filter.all)}>
            All
          </Button>
          <Button
            isActive={filter === Filter.active}
            onClick={() => handleChangeFilter(Filter.active)}>
            Active
          </Button>
          <Button
            isActive={filter === Filter.completed}
            onClick={() => handleChangeFilter(Filter.completed)}>
            Completed
          </Button>
        </FilterButtons>
        <ClearButton isActive={false} onClick={clearCompleted}>
          Clear Completed
        </ClearButton>
      </TodoFooter>
    </TodoListContainer>
  );
};

const TodoListContainer = styled(Container)`
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  margin-bottom: 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;

  border: ${(props) => (props.isActive ? `1px solid ${props.theme.colors.primary}` : 'none')};
  border-radius: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const FilterButtons = styled.div`
  display: flex;
`;

const TodoFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemsLeft = styled.span`
  font-size: 12px;
`;

const ClearButton = styled(Button)`
  font-size: 12px;
  background-color: transparent;
`;
