import React from "react";
import TodoHeaderClass from "./TodoHeaderClass";
import TodoItemClass from "./TodoItemClass";

let id = 1;

export default class TodoAppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  handleAddTodo = (content) => {
    this.setState({
      todos: [
        {
          id,
          content,
          isDone: false,
        },
        ...this.state.todos,
      ],
    });
    id++;
  };
  handleRemoveTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };
  handleToggleTodoState = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
    });
  };

  render() {
    return (
      <>
        <TodoHeaderClass handleAddTodo={this.handleAddTodo}></TodoHeaderClass>
        {this.state.todos.map((todo) => (
          <TodoItemClass
            key={todo.id}
            todo={todo}
            handleRemoveTodo={this.handleRemoveTodo}
            handleToggleTodoState={this.handleToggleTodoState}
          />
        ))}
      </>
    );
  }
}
