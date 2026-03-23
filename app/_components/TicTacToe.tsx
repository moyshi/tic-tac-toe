import { useCallback, useMemo, useState } from "react";
import { Button, Dialog } from "@mui/material";

const OPTIONS_TO_FILL = ['X', 'O']
const BOARD_LENGTH = 3

export default function TicTacToe({firstPlayerName, secondPlayerName}: {firstPlayerName:string, secondPlayerName:string}) {
  const [board, setBoard] = useState<string[][]>(Array.from({ length: BOARD_LENGTH }, () => Array.from({length: BOARD_LENGTH}, () => ('')) ) )
  const [turnNum, setTurnNum] = useState<number>(0)
  const boardClick = useCallback((y:number, x:number) => {
    setBoard((priv) => {
      if (priv[y][x]) {return priv};
      priv = [
        ...priv.slice(0, y),
        priv[y].map((v, i) => (i === x) ? OPTIONS_TO_FILL[turnNum % 2] : v),
        ...priv.slice(y + 1)
    ]
      setTurnNum(turnNum + 1)
      return priv
    })
  }, [turnNum])
  const winner = useMemo(() => checkWin(board), [board]);
  return (
    <> 
        <Dialog
            open={Boolean(turnNum == BOARD_LENGTH**2 || winner)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="h-30 w-60 flex flex-col space-between justify-around items-center">
                <h1>
                    {Boolean(winner) ?
                        `${(OPTIONS_TO_FILL.indexOf(winner) === 0) ? firstPlayerName : secondPlayerName} wins!`
                    :
                        "game over, no one wins."
                    }
                </h1>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    new game
                </Button>
            </div>
        </Dialog>
        <h1 className="mb-10">{(turnNum % 2 === 0) ? firstPlayerName : secondPlayerName} turns</h1>
        <Board
            board={board}
            click={boardClick}
        />
    </>
  )
}

function Board({board, click}:{board:string[][], click:(y:number, x:number) => void}) {
  return (
    <div className="flex max-h-7/10 h-[70vw] max-w-7/10 w-[70vh]  relative">
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(1 / BOARD_LENGTH) * 100}%`}}/>
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(2 / BOARD_LENGTH) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(1 / BOARD_LENGTH) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(2 / BOARD_LENGTH) * 100}%`}}/>
      {board.map((row, hight) => row.map((value, witdh) => 
        <button
          key={`${hight}${witdh}`}
          className={`absolute text-9xl flex justify-center items-center cursor-pointer`}
          style={{
            height:`${(1 / BOARD_LENGTH) * 100}%`,
            width:`${(1 / BOARD_LENGTH) * 100}%`,
            top:`${(hight / BOARD_LENGTH) * 100}%`,
            left:`${(witdh / BOARD_LENGTH) * 100}%`
          }}
          onClick={() => {click(hight, witdh)}}
        >{value}</button>
      ))}
    </div>
  )
}

function checkWin(board:string[][]):string {
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