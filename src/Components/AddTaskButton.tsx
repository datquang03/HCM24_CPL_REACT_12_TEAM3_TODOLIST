import { useState } from "react";
import ItemsForm from "./ItemsForm";

const AddTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {!isOpen ? (
        <div
          className="mx-4 flex gap-4 items-baseline cursor-pointer text-white group"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className="text-xl pb-1 px-2 rounded-full group-hover:bg-blue-600 group-hover:text-white">
            +
          </div>
          <div className="font-semibold group-hover:text-blue-600">
            Add Task
          </div>
        </div>
      ) : (
        <ItemsForm setIsOpen = {setIsOpen}/>
      )}
    </div>
  );
};

export default AddTaskButton;
