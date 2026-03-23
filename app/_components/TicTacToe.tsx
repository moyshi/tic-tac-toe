import { useCallback, useMemo, useState } from "react";
import { Button, Dialog } from "@mui/material";
import Board from "./Board";
import checkWin from "./checkWin";

const OPTIONS_TO_FILL = ['X', 'O']
const BOARD_LENGTH = 3
const emptyBoard = () => Array.from({ length: BOARD_LENGTH }, () => Array.from({length: BOARD_LENGTH}, () => (''))) 

export default function TicTacToe({firstPlayerName, secondPlayerName}: {firstPlayerName:string, secondPlayerName:string}) {
  const [board, setBoard] = useState<string[][]>(emptyBoard())
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
  const win = useMemo(() => checkWin(board), [board]);
  return (
    <> 
        <Dialog
            open={Boolean(turnNum == BOARD_LENGTH**2 || win)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="h-40 w-60 flex flex-col space-between justify-around items-center">
                <h1>
                    {win ?
                        `${(OPTIONS_TO_FILL.indexOf(board[win.x][win.y]) === 0) ? firstPlayerName : secondPlayerName} wins!`
                    :
                        "game over, no one wins."
                    }
                </h1>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    new game
                </Button>
                <Button variant="outlined" onClick={() => {setBoard(emptyBoard()); setTurnNum(0)}}>
                    start over
                </Button>
            </div>
        </Dialog>
        <h1 className="mb-10">{(turnNum % 2 === 0) ? firstPlayerName : secondPlayerName} turns</h1>
        <Board
            board={board}
            click={boardClick}
            win={win}
        />
    </>
  )
}
