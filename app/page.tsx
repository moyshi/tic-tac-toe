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
        <></>
      }
    </div>
  );
}