import { useCallback, useMemo, useState } from "react";
import { Button, Dialog } from "@mui/material";
import Board from "./Board";
import checkWin from "./checkWin";

const OPTIONS_TO_FILL = ['X', 'O']
const BOARD_LENGTH = 3


type BoardType = ("X" | "O" | "")[][]

const emptyBoard = ():BoardType => Array.from({ length: BOARD_LENGTH }, () => Array.from({length: BOARD_LENGTH}, () => (''))) as BoardType

export default function TicTacToe({firstPlayerName, secondPlayerName}: {firstPlayerName:string, secondPlayerName:string}) {
  const [board, setBoard] = useState<BoardType>(emptyBoard())
  const [turnNum, setTurnNum] = useState<number>(0)
  const boardClick = useCallback((y:number, x:number) => {
    setBoard((currentBoard) => {
        if (currentBoard[y][x]) {return currentBoard};
        const newBoard = [
            ...currentBoard.slice(0, y),
            currentBoard[y].map((v, i) => (i === x) ? OPTIONS_TO_FILL[turnNum % 2] : v),
            ...currentBoard.slice(y + 1)
        ] as BoardType
        setTurnNum(turnNum + 1)
        return newBoard
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
                        `${(OPTIONS_TO_FILL.indexOf(board[win.posX][win.posY]) === 0) ? firstPlayerName : secondPlayerName} wins!`
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
