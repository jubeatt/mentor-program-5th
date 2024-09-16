import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 90px 20px;
    transition: all 0.3s;

    ${({ $isDarkMode, theme }) =>
      $isDarkMode && `background-color: ${theme.darkModeBlack}`}
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  #root {
    max-width: 500px;
    margin: 0 auto;
    padding: 30px;
    border: 2px solid rgb(0 0 0 / 10%);
    border-radius: 4px;
    ${({ $isDarkMode, theme }) =>
      $isDarkMode && `border-color: ${theme.darkModeYellow}`}
  }

`;
