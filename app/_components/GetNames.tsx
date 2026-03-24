
import { Button, TextField } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function GetNames({names, close}:{names:{titele:string, setName: Dispatch<SetStateAction<string>>}[], close:()=>void}): ReactNode  {
  return (
    <form 
      className="bg-gray-700 h-80 flex flex-col space-between justify-around items-center p-5 rounded-sm" 
      action={(data) => {
        data.values().forEach((value, index) => names[index].setName(String(value)))
        close()
      }}
    >
      <h1>pleaze enter players names</h1>
        {names.map((nameToGet, key) =>
          <TextField 
            key={key}
            name={String(key)}
            id="outlined-basic"
            label={nameToGet.titele}
            variant="outlined" 
            required 
          />
        )}
        <Button
          variant="outlined"
          type="submit"
        >
          subbmit
        </Button>
    </form>
  )
}