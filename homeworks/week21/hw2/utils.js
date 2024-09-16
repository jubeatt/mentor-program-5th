function countTotal(board, currentY, currentX, directionX, directionY) {
  // 現在要檢查的棋子顏色
  const now = board[currentY][currentX];

  // 這邊的思路是檢查棋子的每個方向
  // 例如我給的方向是「上方」（0, 1）
  // 那下面的迴圈就會一直把 y 軸加一，並計算重複出現的棋子數目
  // 只要碰到不連續，或超出棋盤就會跳掉
  // 總之最後會拿到一筆 total 的數目

  let tempX = currentX;
  let tempY = currentY;
  let total = 0;

  do {
    // 檢查下一個棋子
    tempX += directionX;
    tempY += directionY;

    // board[tempY] 如果不存在的話直接不用看了
    // 至於 board[tempY][tempX] 不用檢查是因為就算不做檢查，後面的比對結果也一定不對，
    // 所以就不需要再多寫一層 && [board][tempY][tempX] 來檢查了
    if (board[tempY] && board[tempY][tempX] === now) {
      // 如果下一個棋子等於我現在要檢查的，連續的棋子數 + 1
      total++;
    } else {
      break;
    }
  } while (true);
  return total;
}

export function findWinner(board, y, x) {
  // 計算重複出現的棋子數目
  // 1. 目標的左邊跟右邊（X 軸）
  // 2. 目標的上面跟下面（Y 軸）
  // 3. 目標的右上跟左下（正斜線）
  // 4. 目標的右下跟左上（反斜線）
  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    return board[y][x];
  }

  // 回傳 true 表示每一個 row 裡的 col 都有值，
  // 都有值就表示棋盤下滿了，所以回傳平手
  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }
}
