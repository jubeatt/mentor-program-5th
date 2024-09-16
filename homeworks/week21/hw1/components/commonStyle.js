import { css } from "styled-components";
import { MEDIA_HOVER } from "../constants/mediaQuery";

export const defaultTodoItemButton = () => css`
  border-radius: 4px;
  padding: 8px 12px;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  flex-shrink: 0;

  ${MEDIA_HOVER} {
    &:hover {
      background-color: black;
      color: white;
    }
  }

`;

export const defaultTodoConsoleButton = () => css`
  background-color: black;
  color: white;
  padding: 6px 22px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
`;
