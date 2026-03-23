export default function Board({board, click, boardLength}:{board:string[][], click:(y:number, x:number) => void, boardLength: number}) {
  return (
    <div className="flex max-h-7/10 h-[70vw] max-w-7/10 w-[70vh]  relative">
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(1 / boardLength) * 100}%`}}/>
      <div className={`absolute bg-green-300 w-full h-2`} style={{top:`${(2 / boardLength) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(1 / boardLength) * 100}%`}}/>
      <div className={`absolute bg-green-300 h-full w-2`} style={{left:`${(2 / boardLength) * 100}%`}}/>
      {board.map((row, hight) => row.map((value, witdh) => 
        <button
          key={`${hight}${witdh}`}
          className={`absolute text-9xl flex justify-center items-center cursor-pointer`}
          style={{
            height:`${(1 / boardLength) * 100}%`,
            width:`${(1 / boardLength) * 100}%`,
            top:`${(hight / boardLength) * 100}%`,
            left:`${(witdh / boardLength) * 100}%`
          }}
          onClick={() => {click(hight, witdh)}}
        >{value}</button>
      ))}
    </div>
  )
}