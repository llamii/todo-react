import { Button, Checkbox } from "@mui/material";
import { FC, useState } from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { ITodo } from "../types/todo";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { styled } from "styled-components";

interface ITodoItemProps extends ITodo {
  toggleTodo: (id: number) => void;
  editTodo: (id: number, name: string) => void;
  removeTodo: (id: number) => void;
}

export const TodoItem: FC<ITodoItemProps> = (props) => {
  const { id, name, completed, toggleTodo, editTodo, removeTodo } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleNameBlur = () => {
    if (editedName.trim() !== "") {
      editTodo(id, editedName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleNameBlur();
    }
  };

  return (
    <TodoItemWrapper>
      <Checkbox
        disableRipple
        checked={completed}
        icon={<UncheckedIcon fontSize="small" />}
        checkedIcon={<CheckedIcon fontSize="small" />}
        onChange={() => toggleTodo(id)}
      />
      {isEditing ? (
        <Input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <TodoText
          $isChecked={completed}
          onDoubleClick={() => setIsEditing(true)}
        >
          {name}
        </TodoText>
      )}

      <DeleteButton
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
        disableRipple
        onClick={() => removeTodo(id)}
      >
        <DeleteIcon fontSize="small" />
      </DeleteButton>
    </TodoItemWrapper>
  );
};

const UncheckedIcon = styled(RadioButtonUncheckedOutlinedIcon)`
  color: ${(props) => props.theme.colors.primary};
`;

const CheckedIcon = styled(CheckCircleOutlineIcon)`
  color: ${(props) => props.theme.colors.success};
`;

const DeleteIcon = styled(ClearIcon)`
  color: ${(props) => props.theme.colors.danger};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const DeleteButton = styled(Button)`
  && {
    background-color: transparent;
    color: ${(props) => props.theme.colors.danger};
    padding: 5px;
    margin: 0;
    display: none;
    &:hover {
      background-color: "transparent";
    }
  }
`;

const TodoItemWrapper = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  &:hover {
    ${DeleteButton} {
      display: flex;
    }
  }
`;

const TodoText = styled.span<{ $isChecked: boolean }>`
  flex-grow: 1;
  margin-right: 8px;

  text-decoration: ${(props) => (props.$isChecked ? `line-through` : "none")};
`;
