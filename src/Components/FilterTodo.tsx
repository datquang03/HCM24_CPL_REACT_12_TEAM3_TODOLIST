import React, { MouseEventHandler, useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { Todo } from '../App';
import SelectTime from './SelectTime';


const FilterTodo = () => {
  //truyen prop tu app qua 
  const [todoName, setTodoName] = useState('');
  const [todoTime, setTodoTime] = useState<[string,string]>(['', '']);
  const [items, setItems] = useState<Todo[]>([]);
  useEffect(() => {
    const currentList = localStorage.getItem("todo");
    const items = currentList ? JSON.parse(currentList) : [];
    setItems(items);
  }, []);
  //1.cho tham so la name status, list dc get tu localstorage 
  //2. handleFilter se return list moi co the get all nhu luc get tu storage
  const handleFilter = (todoList: Todo[]): Todo[] => {
    let filteredList = todoList;

    if (todoName !== '') {
      filteredList = filteredList.filter(todo => todo.name.trim() === todoName.trim());
    }

    if (todoTime[0] !== '' && todoTime[1] !== '') {
      filteredList = filteredList.filter(todo => {
        const todoDate = todo.formToDate; 
        return todoDate >= todoTime[0] && todoDate <= todoTime[1];
      });
    }
    console.log('Filtered List:', filteredList);
    return filteredList;
  };
  console.log('Fil',handleFilter(items));
  
  return (
    <div className='flex justify-end'>
    <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4"> 
        <div className="flex gap-4 mb-4 items-end">
          {/* Todo Name */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Todo Name</label>
            <SearchInput value={todoName} setTodoName={setTodoName} />
          </div>

           {/* Time */}
           <div className="flex-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <SelectTime setTodoTime={setTodoTime}  />
          </div>
          {/* Filters Button */}
          <div className="flex items-center">
            <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() =>
              handleFilter(items)}>
              Filters
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FilterTodo;
