import React from 'react'
import { Input } from 'antd'; 

interface TodoSearchProp  { 
    value : string,
    setTodoName :(name: string) => void;
} 

const SearchInput : React.FC <TodoSearchProp> = ({value,setTodoName}) => {
  return (
    <Input placeholder="Outlined" 
    value={value}
    onChange={(e) => { setTodoName(e.target.value)
     } }
      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
     />
  )
}

export default SearchInput