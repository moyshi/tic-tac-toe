import { Button } from "@mui/material"
import { TypeWin, WinResult } from "./checkWin"

export default function Board({board, click, win}:{board:string[][], click:(y:number, x:number) => void, win: WinResult | void}) {
  return (
    <div className="flex max-h-7/10 h-[70vw] max-w-7/10 w-[70vh]  relative">
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(1 / board.length) * 100}%`}}/>
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(2 / board.length) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(1 / board.length) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(2 / board.length) * 100}%`}}/>
      <div className={`h-full w-full grid grid-cols-${board.length} grid-rows-${board.length}`}>
        {board.map((row, hight) => row.map((value, witdh) => 
          <Button
            key={`${hight}${witdh}`}
            className={`justify-center items-center bg-red-100 h-full w-full`}
            disabled={Boolean(value)}
            variant="text"
            onClick={() => {click(hight, witdh)}}
          >
            <p className="text-9xl">{value}</p>
          </Button>
        ))}
      </div>
      {(win !== undefined) &&
        <div 
          className={`absolute bg-gray-500 h-2 origin-top-left`}
          style={{
            left:`${((win.x + 0.5) / board.length)  * 100}%`,
            top:`${((win.y + 0.5) / board.length) * 100}%`,
            transform: `rotate(${(win.typeWin * 45)}deg)`,
            width: TypeWin[win.typeWin].startsWith('Slant') ? '95%' : '66%'
          }}
        />
      }
    </div>
  )
}