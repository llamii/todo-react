import * as React from "react";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Filter, ITodo, absurd } from "../types/todo";

import { Container } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { mockTodos } from "../mock/mockTodos";
import { styled } from "styled-components";
import { useTodos } from "../hooks/useTodos";

export const TodoList: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    removeCompleted,
    getItemsLeft,
  } = useTodos(mockTodos);

  const itemsLeft = getItemsLeft();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter" && value.trim() !== "") {
      addTodo(value);
      setValue("");
    }
  };

  const handleChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        switch (filter) {
          case Filter.active:
            return !todo.completed;
          case Filter.completed:
            return todo.completed;
          case Filter.all:
            return true;
          default:
            return absurd(filter);
        }
      }),
    [todos, filter]
  );

  const filterButtons = Object.values(Filter).map((f) => (
    <FilterButton
      key={f}
      onClick={() => handleChangeFilter(f)}
      $isActive={f === filter}
    >
      {f}
    </FilterButton>
  ));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <TodoListContainer sx={{ display: "flex" }} maxWidth="sm">
      <Input
        placeholder="Write your todos here..."
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}
      />

      {filteredTodos &&
        filteredTodos.map((todo: ITodo) => (
          <TodoItem
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            removeTodo={removeTodo}
            key={todo.id}
            id={todo.id}
            name={todo.name}
            completed={todo.completed}
          />
        ))}

      <TodoFooter>
        <ItemsLeft>{itemsLeft} item(s) left</ItemsLeft>
        <FilterButtons>{filterButtons}</FilterButtons>
        <ClearButton
          $isActive={false}
          $isVisible={filter === Filter.active ? false : true}
          onClick={removeCompleted}
        >
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
  min-height: 432px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  height: 48px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;

  border: ${(props) =>
    props.$isActive ? `1px solid ${props.theme.colors.primary}` : "none"};
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

  justify-self: end;
  margin-top: auto;
`;

const ItemsLeft = styled.span`
  font-size: 12px;
`;

const ClearButton = styled(FilterButton)<{ $isVisible: boolean }>`
  font-size: 12px;
  background-color: transparent;
  visibility: ${(props) => (props.$isVisible ? `visible` : "hidden")};
`;
