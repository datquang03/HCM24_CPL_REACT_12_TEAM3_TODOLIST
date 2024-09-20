import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SelectTime from "./SelectTime";
import ItemProps from "../Model/ItemProps";

const FilterTodo = () => {
  // States for Todo Name, Time, and Items
  const [todoName, setTodoName] = useState("");
  const [todoTime, setTodoTime] = useState<[string, string]>(["", ""]);
  const [items, setItems] = useState<ItemProps[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const currentList = localStorage.getItem("items");
    const items = currentList ? JSON.parse(currentList) : [];
    setItems(items);
  }, []);

  // Filter function
  const handleFilter = (todoList: ItemProps[]): ItemProps[] => {
    let filteredList = todoList;

    // Filter by name if provided
    if (todoName.trim() !== "") {
      filteredList = filteredList.filter(
        (todo) =>
          todo.name.trim().toLowerCase() === todoName.trim().toLowerCase()
      );
    }

    // Filter by time range if both start and end dates are provided
    if (todoTime[0] !== "" && todoTime[1] !== "") {
      filteredList = filteredList.filter((todo) => {
        const [todoStartDate, todoEndDate] = todo.formToDate;
        return todoStartDate >= todoTime[0] && todoEndDate <= todoTime[1];
      });
    }

    console.log("Filtered List:", filteredList);
    return filteredList;
  };

  console.log("Filtered List:", handleFilter(items));

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
                onClick={() => handleFilter(items)}
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
