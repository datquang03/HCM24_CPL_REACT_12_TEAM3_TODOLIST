import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SelectTime from "./SelectTime";
import ItemProps from "../Model/ItemProps";
import handleFilter from "../data/filterTodo";


type FilterProps = {
  todoName: string
  todoTime:  [string, string]
  setTodoName :(name: string) => void
  setTodoTime :(dateStrings: [string, string]) => void;
  onFilter: () => void;
}

const FilterTodo = ({todoName, todoTime,setTodoName,setTodoTime,onFilter}:FilterProps) => {

  return (
    <div className="flex justify-end">
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 mb-4 items-end">
            {/* Todo Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Todo Name
              </label>
              <SearchInput value={todoName} setTodoName={setTodoName} />
            </div>
            {/* Time */}
            <div className="flex-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <SelectTime setTodoTime={setTodoTime} />
            </div>
            {/* Filters Button */}
            <div className="flex items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={onFilter}
              >
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
