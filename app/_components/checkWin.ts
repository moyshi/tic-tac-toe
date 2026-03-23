
export default function checkWin(board:string[][]):string {
  let winRow, winCol, winSlantTopToButtom, winSlantButtomToTop;

  for (let y = 0; y < board.length; y++) {
    winRow = board[y][0]
    winCol = board[0][y]
    for (let x = 1; x < board.length; x++) {
      if (!winRow || board[y][x] != board[y][x-1]) {winRow = ''};
      if (!winCol || board[x][y] != board[x-1][y]) {winCol = ''};
    }
    if (winRow || winCol) return winRow || winCol;
  }

  winSlantTopToButtom = board[0][0]
  winSlantButtomToTop = board[board.length - 1][0]
  for (let i = 1; i < board.length; i++) {
    if (!winSlantTopToButtom || board[i][i] != board[i-1][i-1]) {winSlantTopToButtom = ''};
    if (!winSlantButtomToTop || board[board.length - i - 1][i] != board[board.length - i][i-1]) {winSlantButtomToTop = ''};
  }

  return winSlantTopToButtom || winSlantButtomToTop;
}