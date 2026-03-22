'use client';
import { useState } from "react";
import GetNames from "./_components/GetNames";


export default function Home() {
  const [firstPlayerName, setFirstPlayerName] = useState<string>('')
  const [secondPlayerName, setSecondPlayerName] = useState<string>('')
  const [getNamesOpen, setGetNamesOpen] = useState<boolean>(true)
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {getNamesOpen ?
        <GetNames 
          names={[
            {titele: 'first player name', velue: firstPlayerName, setName: setFirstPlayerName},
            {titele: 'second player name', velue: secondPlayerName, setName: setSecondPlayerName}
          ]}
          close={() => {setGetNamesOpen(false)}}
        />
        :
        <TicTacToe
          firstPlayerName={firstPlayerName}
          secondPlayerName={secondPlayerName}
        />
      }
    </div>
  );
}

function TicTacToe({firstPlayerName, secondPlayerName}: {firstPlayerName: string, secondPlayerName: string}) {
  const [board, setBoard] = useState<string[][]>(Array(3).fill([...Array(3).fill('')]))
  return (
    <>
      {firstPlayerName}
      {secondPlayerName}
      <div className="flex max-h-7/10 h-[70vw] max-w-7/10 w-[70vh]  relative">
        <line className="absolute top-1/3 bg-green-300 w-full h-2"/>
        <line className="absolute top-2/3 bg-green-300 w-full h-2"/>
        <line className="absolute left-1/3 bg-green-300 h-full w-2"/>
        <line className="absolute left-2/3 bg-green-300 h-full w-2"/>
        {board.map((row, hight) => row.map((value, witdh) => 
          <div
            key={String(witdh) + String(hight)}
            className={`absolute text-9xl h-1/3 w-1/3 top-${hight}/3 left-${witdh}/3 flex justify-center items-center`}
            onClick={() => {setBoard((privBoard:string[][]) => {
              console.log(board)
              console.log(hight, witdh)
              return privBoard
            })}}
          >{value}</div>
        ))}
      </div>
    </>
  )
}