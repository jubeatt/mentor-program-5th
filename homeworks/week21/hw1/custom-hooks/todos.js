import { useState, useEffect, useRef, useMemo } from "react";

export function useTodos() {
  const id = useRef(1);

  // 沒值的話會是 null
  // null || []
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos");
    if (todoData && todoData !== "[]") {
      todoData = JSON.parse(todoData);
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });

  const [filter, setFilter] = useState("all");

  // 更新 storage
  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (content) => {
    setTodos([
      {
        id: id.current,
        content,
        isDone: false,
      },
      ...todos,
    ]);
    id.current++;
  };

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") return todo;
      if (filter === "active") return !todo.isDone;
      if (filter === "completed") return todo.isDone;
      throw Error("wrong filter type");
    });
  }, [todos, filter]);

  const handleSwitchFilter = (type) => {
    if (type === "all") return setFilter("all");
    if (type === "active") return setFilter("active");
    if (type === "completed") return setFilter("completed");
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodoState = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, isDone: !todo.isDone };
      })
    );
  };

  const handleUpdateTodo = (id, content) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, content };
        }
        return todo;
      })
    );
  };

  const handleRemoveAllTodo = () => setTodos([]);

  return {
    id,
    todos,
    setTodos,
    filter,
    filterTodos,
    handleSwitchFilter,
    handleAddTodo,
    handleRemoveTodo,
    handleUpdateTodo,
    handleRemoveAllTodo,
    handleToggleTodoState,
  };
}
