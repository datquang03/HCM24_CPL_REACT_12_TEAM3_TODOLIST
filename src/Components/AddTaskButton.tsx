import { useState } from "react";
import ItemsForm from "./ItemsForm";

interface AddTaskButtonProps {
  onSubmitCallback: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onSubmitCallback }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {!isOpen ? (
        <div
          className="absolute top-5 right-5 mx-4 p-2 flex gap-2 items-baseline cursor-pointer text-white group"
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
        <ItemsForm onSubmitCallback={onSubmitCallback} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export default AddTaskButton;
