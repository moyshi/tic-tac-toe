
import { Button, TextField } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function GetNames({names, close}:{names:{titele:string, velue:string, setName: Dispatch<SetStateAction<string>>}[], close:()=>void}): ReactNode  {
  return (
    <div className="bg-gray-700 h-80 flex flex-col space-between justify-around items-center p-5 rounded-sm">
      <h1>pleaze enter players names</h1>
      {names.map((nameToGet, key) =>
        <TextField 
          key={key}
          id="outlined-basic"
          label={nameToGet.titele}
          variant="outlined" 
          required 
          value={nameToGet.velue} 
          onChange={(event) => {nameToGet.setName(event.target.value)}}
        />
      )}
      <Button
        variant="outlined"
        onClick={close}
        disabled={names.some(nameToGet => !nameToGet.velue)}
      >
        subbmit
      </Button>
    </div>
  )
}