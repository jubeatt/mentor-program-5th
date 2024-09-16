import styled from "styled-components";
import { useRef, useState, useEffect, useContext } from "react";
import { defaultTodoItemButton } from "../commonStyle";
import { DarkModeContext } from "../DarkModeContext";
import { MEDIA_HOVER } from "../../constants/mediaQuery";
import PropTypes from "prop-types";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #c7c7c7;
  border-radius: 4px;

  & + & {
    margin-top: 8px;
  }

  ${({ $isDarkMode, theme }) =>
    $isDarkMode && `border-color: ${theme.darkModeYellow}`}
`;
const TodoContent = styled.div`
  max-width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ $isDone }) => $isDone && "text-decoration: line-through;"}
  ${({ $isDarkMode, theme }) => $isDarkMode && `color: ${theme.darkModeYellow}`}
`;

const TodoEditor = styled.form`
  flex: 1;
`;

const TodoEditorInput = styled.input`
  width: 100%;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1em;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  &:focus {
    outline: 0;
  }
  ${({ $isDarkMode, theme }) =>
    $isDarkMode &&
    `
    box-shadow: none;
    background-color: transparent;
    color: ${theme.darkModeYellow};
  `}
`;

const TodoButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  button ~ button {
    margin-left: 8px;
  }
`;
const GreenButton = styled.button`
  ${defaultTodoItemButton}
  border-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.green};
  ${MEDIA_HOVER} {
    &:hover {
      background-color: ${({ theme }) => theme.green};
    }
  }
  
  ${({ $isDone, theme }) =>
    $isDone
      ? `
    background-color: ${theme.green};
    color: white;`
      : ""}
`;
const RedButton = styled.button`
  ${defaultTodoItemButton}
  border-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.red};
  ${MEDIA_HOVER} {
    &:hover {
      background-color: ${({ theme }) => theme.red};
    }
  }
  
`;

const OrangeButton = styled.button`
  ${defaultTodoItemButton}
  border-color: ${({ theme }) => theme.orange};
  color: ${({ theme }) => theme.orange};
  ${MEDIA_HOVER} {
    &:hover {
      background-color: ${({ theme }) => theme.orange};
    }
  }

`;

export default function TodoItem({
  todo,
  handleRemoveTodo,
  handleUpdateTodo,
  handleToggleTodoState,
}) {
  const isDarkMode = useContext(DarkModeContext);

  const handleButtonClick = (type) => {
    if (type === "changeState") return () => handleToggleTodoState(todo.id);
    if (type === "delete") return () => handleRemoveTodo(todo.id);
    if (type === "update") return () => setIsOnEdit(true);
  };

  const [isOnEdit, setIsOnEdit] = useState(false);
  const [inputValue, setInputValue] = useState(() => todo.content);

  const inputRef = useRef(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(todo.id, inputValue);
    setIsOnEdit(false);
  };

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInputBlur = () => setIsOnEdit(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <TodoItemWrapper id={todo.id} $isDarkMode={isDarkMode}>
      {!isOnEdit && (
        <TodoContent $isDarkMode={isDarkMode} $isDone={todo.isDone}>
          {todo.content}
        </TodoContent>
      )}
      {isOnEdit && (
        <TodoEditor onSubmit={handleEditSubmit}>
          <TodoEditorInput
            required
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            $isDarkMode={isDarkMode}
          />
        </TodoEditor>
      )}

      {
        !isOnEdit && (
      <TodoButtonWrapper>
          <GreenButton
            $isDone={todo.isDone}
            onClick={handleButtonClick("changeState")}
            children={todo.isDone ? "已完成" : "未完成"}
          />
          <OrangeButton onClick={handleButtonClick("update")}>編輯</OrangeButton>
          <RedButton onClick={handleButtonClick("delete")}>刪除</RedButton>
      </TodoButtonWrapper>
        )
      }
      
    </TodoItemWrapper>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isDone: PropTypes.bool,
  }),
  handleRemoveTodo: PropTypes.func,
  handleToggleTodoState: PropTypes.func,
  handleUpdateTodo: PropTypes.func,
};
