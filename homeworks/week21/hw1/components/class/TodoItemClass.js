import React from "react";
import styled from "styled-components";
import defaultButton from "../commonStyle";
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
`;
const TodoContent = styled.div`
  max-width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ $isDone }) => $isDone && "text-decoration: line-through;"}
`;
const TodoButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  button ~ button {
    margin-left: 8px;
  }
`;
const GreenButton = styled.button`
  ${defaultButton}
  border-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.green};
  &:hover {
    background-color: ${({ theme }) => theme.green};
  }
  ${({ $isDone, theme }) =>
    $isDone &&
    `
    background-color: ${theme.green};
    color: white;
    `}
`;
const RedButton = styled.button`
  ${defaultButton}
  border-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.red};
  &:hover {
    background-color: ${({ theme }) => theme.red};
  }
`;

export default class TodoItemClass extends React.Component {
  handleButtonClick(type) {
    const { handleToggleTodoState, handleRemoveTodo, todo } = this.props;
    return type === "changeState"
      ? () => handleToggleTodoState(todo.id)
      : () => handleRemoveTodo(todo.id);
  }

  render() {
    const { todo } = this.props;
    return (
      <TodoItemWrapper id={todo.id}>
        <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <GreenButton
            $isDone={todo.isDone}
            onClick={this.handleButtonClick("changeState")}
          >
            {todo.isDone ? "已完成" : "未完成"}
          </GreenButton>
          <RedButton onClick={this.handleButtonClick("delete")}>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
    );
  }
}

TodoItemClass.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    isDone: PropTypes.bool,
    content: PropTypes.string,
  }),
  handleToggleTodoState: PropTypes.func,
  handleRemoveTodo: PropTypes.func,
};
