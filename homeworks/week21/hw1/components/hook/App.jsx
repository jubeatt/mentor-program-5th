import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { GlobalStyle } from "../GlobalStyle";
import { DarkModeContext } from "../DarkModeContext";
import TodoItem from "./TodoItem";
import TodoConsole from "./TodoConsole";
import TodoHeader from "./TodoHeader";
import { useTodos } from "../../custom-hooks/todos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const theme = {
  blue: "royalblue",
  lightBlue: "#4169e1a3",
  orange: "darkorange",
  lightOrange: "#ff8c006b",
  green: "mediumseagreen",
  lightGreen: "#3cb3718f",
  red: "palevioletred",
  lightRed: "#db70937d",
  darkModeYellow: "#fdcb6e",
  darkModeBlack: "#2d3436",
};

const SwitchDarkModeButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.darkModeBlack};
  color: ${({ theme }) => theme.darkModeYellow};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  ${({ $isDarkMode, theme }) =>
    $isDarkMode &&
    `
    background-color: ${theme.darkModeYellow};
    color: ${theme.darkModeBlack};
  `}
`;

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const {
    filter,
    filterTodos,
    handleSwitchFilter,
    handleAddTodo,
    handleRemoveTodo,
    handleUpdateTodo,
    handleToggleTodoState,
    handleRemoveAllTodo,
  } = useTodos();

  return (
    <DarkModeContext.Provider value={isDarkMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyle $isDarkMode={isDarkMode} />
        <TodoHeader handleAddTodo={handleAddTodo}></TodoHeader>
        <TodoConsole
          filter={filter}
          handleSwitchFilter={handleSwitchFilter}
          handleRemoveAllTodo={handleRemoveAllTodo}
        />
        {filterTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleUpdateTodo={handleUpdateTodo}
              handleRemoveTodo={handleRemoveTodo}
              handleToggleTodoState={handleToggleTodoState}
            ></TodoItem>
          );
        })}
        <SwitchDarkModeButton
          $isDarkMode={isDarkMode}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </SwitchDarkModeButton>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
