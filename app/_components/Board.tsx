import { Button } from "@mui/material"
import { WinOrientation, WinResult } from "./checkWin"
import { useCallback, useState } from "react"
import { FillOptions } from "./TicTacToe"

export default function Board({board, click, win, currentPlayerTurn}:{board:(FillOptions|undefined)[][], click:(y:number, x:number) => void, win: WinResult | void, currentPlayerTurn:boolean}) {
  const [buttonsDisabled, setButtonsDisabled] = useState<Record<string, boolean>>({})
  const changeButtonsDisabled = useCallback((key:string, status:boolean) => {
    setButtonsDisabled((privButtonsDisabled) => {return {...privButtonsDisabled, [key]: status}})
  }, [])

  return (
    <div className=" max-h-full h-[40vw] max-w-1/2 w-[70vh]">
      <div className="w-full h-8 flex flex-col items-center">{currentPlayerTurn && <h1>play tour turn</h1>}</div>
      <div className="flex h-full w-full relative mx-4">
        <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(1 / board.length) * 100}%`}}/>
        <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(2 / board.length) * 100}%`}}/>
        <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(1 / board.length) * 100}%`}}/>
        <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(2 / board.length) * 100}%`}}/>
        <div 
          className={`h-full w-full grid`}
          style={{
            gridTemplateColumns: `${100/board.length}% `.repeat(board.length),
            gridTemplateRows: `${100/board[0].length}% `.repeat(board[0].length)
          }}
        >
          {board.map((row, hight) => row.map((value, witdh) => {
            const key = `${hight}${witdh}`
            return (
              <Button
                key={key}
                className={`justify-center items-center bg-red-100 h-full w-full`}
                sx={{ '&.MuiButton-root:hover': buttonsDisabled[key] ? {bgcolor: 'transparent', cursor: 'auto'}: {} }}
                disabled={Boolean(value) || !currentPlayerTurn}
                variant="text"
                onClick={() => {click(hight, witdh)}}
                onMouseEnter={(e) => {if (e.buttons === 1) changeButtonsDisabled(key, true)}}
                onMouseUp={() => changeButtonsDisabled(key, false)}
                onMouseOut={() => changeButtonsDisabled(key, false)}
              >
                <p className="text-9xl">{value}</p>
              </Button>
            )
          }))}
        </div>
        {(win !== undefined) &&
          <div 
            className={`absolute bg-gray-500 h-2`}
            style={{
              left:`${((win.posX + 0.15) / board.length)  * 100}%`,
              top:`${((win.posY + 0.5) / board.length) * 100}%`,
              transform: `rotate(${(win.orientation * 45)}deg)`,
              transformOrigin: WinOrientation[win.orientation].startsWith('Slant') ? "10.3% 50%" : "13% 50%",
              width: WinOrientation[win.orientation].startsWith('Slant') ? '120%' : '90%'
            }}
          />
        }
      </div>
    </div>
  )
}