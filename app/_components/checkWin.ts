
export enum WinOrientation {
  SlantButtomToTop = -1,
  Row,
  SlantTopToButtom,
  Col,
}

export interface WinResult {orientation: WinOrientation, posX: number, posY: number}

export default function checkWin(board:(number|undefined)[][]): WinResult | void {
  let winRow, winCol, winSlantTopToButtom, winSlantButtomToTop;

  for (let first_index = 0; first_index < board.length; first_index++) {
    winRow = board[first_index][0]
    winCol = board[0][first_index]
    for (let second_index = 1; second_index < board.length; second_index++) {
      if (!winRow || board[first_index][second_index] != board[first_index][second_index-1]) {winRow = ''};
      if (!winCol || board[second_index][first_index] != board[second_index-1][first_index]) {winCol = ''};
    }
    if (winRow) {
      return {orientation: WinOrientation.Row, posX: 0, posY: first_index}
    }
    if (winCol) {
      return {orientation: WinOrientation.Col, posX: first_index, posY: 0}
    }
  }

  winSlantTopToButtom = board[0][0]
  winSlantButtomToTop = board[board.length - 1][0]
  for (let i = 1; i < board.length; i++) {
    if (!winSlantTopToButtom || board[i][i] != board[i-1][i-1]) {winSlantTopToButtom = ''};
    if (!winSlantButtomToTop || board[board.length - i - 1][i] != board[board.length - i][i-1]) {winSlantButtomToTop = ''};
  }

  if (winSlantTopToButtom) {
    return {orientation: WinOrientation.SlantTopToButtom, posY:0, posX:0}
  }
  if (winSlantButtomToTop) {
    return {orientation: WinOrientation.SlantButtomToTop, posY:2, posX:0}
  }
}