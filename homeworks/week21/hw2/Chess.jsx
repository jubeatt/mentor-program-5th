import { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  width: 28px;
  height: 28px;
  font-size: 0.9em;
  flex-shrink: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    width: 20px;
    height: 20px;
  }

  @media (hover: hover) {
    &:hover {
      background-color: rgb(0 0 0 / 20%);
    }
  }

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    border-left: 1px solid rgb(0 0 0 / 50%);
    border-top: 1px solid rgb(0 0 0 / 50%);
  }

  &:nth-last-child(2)::after {
    border-right: 1px solid rgb(0 0 0 / 50%);
  }

  &:last-child::after {
    display: none;
  }
`;

const Piece = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.$type === "white" ? "white" : "black")};
  z-index: 1;

  @media screen and (max-width: 600px) {
    width: 15px;
    height: 15px;
  }
`;

export default function Chess({ row, col, value, onClick }) {
  const handleClick = useCallback(() => {
    onClick(row, col, value);
  }, [row, col, value, onClick]);
  return (
    <Button onClick={handleClick}>{value && <Piece $type={value} />}</Button>
  );
}

Chess.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
};
