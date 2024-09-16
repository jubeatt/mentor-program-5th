import { GlobalStyle } from "./GlobalStyle";
import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { findWinner } from "./utils";
import Board from "./Board";

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: normal;
  color: #7a7a7a;
  text-align: center;
`;

const Status = styled.h2`
  margin-top: 30px;
  font-size: 1.2em;
  font-weight: normal;
  color: #7a7a7a;
  text-align: center;
`;

const WinnerModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
`;

const WinnerModalInner = styled.div`
  margin: auto 0;
  width: 100%;
  padding: 100px 50px;
  background-color: white;
  text-align: center;
`;

const WinnerModalTitle = styled.h2`
  font-size: 2em;
  font-weight: normal;
  color: #7a7a7a;
`;
const TryAgainButton = styled.button`
  background-color: #1bb900;
  padding: 15px 20px;
  border-radius: 4px;
  border: none;
  color: white;
  margin-top: 40px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.2em;
  @media (hover: hover) {
    &:hover {
      background-color: #1bb90069;
    }
  }
`;

function App() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
  const [winner, setWinner] = useState();
  const [isBlackNext, setIsBlackNext] = useState(true);

  // 紀錄上一次下棋的 row and col
  const lastRow = useRef();
  const lastCol = useRef();

  // 這不需要每次 render 都重新宣告一遍
  // 所以用 useCallback 來記住，並把 dependecies 設為空
  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        // 不是我要找的那個橫排，直接回傳
        if (currentY !== y) return row;

        // 如果是的話，找到我要改的那個 x 的位置
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const handleChessClick = useCallback(
    (row, col, value) => {
      // 已經下過了
      if (value) return;

      // 更新新的下棋紀錄
      lastRow.current = row;
      lastCol.current = col;

      // 傳入下棋的位置來更新棋盤
      updateBoard(row, col, isBlackNext ? "black" : "white");
      // 更新 player
      setIsBlackNext(!isBlackNext);
    },
    [updateBoard, isBlackNext]
  ); // 當 updateBoard 和 isBlackNext 改變時這個 function 要重新宣告

  useEffect(() => {
    // 還沒下半步棋
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    // 有的話就根據上一次的下棋位置來判斷輸贏
    setWinner(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  return (
    <>
      <GlobalStyle />
      <Title>Welcome to Gomoku！</Title>
      <Board board={board} handleChessClick={handleChessClick} />
      <Status>Next player is: {isBlackNext ? "Black" : "White"}</Status>
      {winner && (
        <WinnerModal>
          <WinnerModalInner>
            <WinnerModalTitle>Winner is {winner}</WinnerModalTitle>
            <TryAgainButton onClick={() => window.location.reload()}>
              Try again
            </TryAgainButton>
          </WinnerModalInner>
        </WinnerModal>
      )}
    </>
  );
}

export default App;


