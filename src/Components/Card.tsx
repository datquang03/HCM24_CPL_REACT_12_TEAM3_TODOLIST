import { useEffect, useState } from "react";
import ItemProps from "../Model/ItemProps";

interface CardProps {
  task: ItemProps; // Accept a single task
}

const Card = ({ task }: CardProps) => {
  // const [items, setItems] = useState<ItemProps[]>([]);
  // useEffect(() => {
  //     const currentList = localStorage.getItem("todo");
  //     const todo = currentList ? JSON.parse(currentList) : dataForm; // Use dataForm as fallback
  //     setItems(todo);
  //     console.log(todo);
  // }, []);

  const [showModal, setShowModal] = useState(false);
  const [editableTask, setEditableTask] = useState<ItemProps>(task);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false); // kiem tra thoi gian task

  // Open the modal and set the task as editableTask
  const openModal = () => {
    setEditableTask(task);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle input changes and update the task in state
  const handleChange = (status: string) => {
    setEditableTask((prev) => ({
      ...prev,
      status: status as "New" | "Inprogress" | "Complete",
    }));
  };

  // Kiem tra task da qua han
  const checkOverdue = () => {
    const currentDate = new Date(); // Current date
    const taskEndDate = new Date(editableTask.formToDate[1]); // Task's "To" date

    // Compare current date with task end date
    if (currentDate > taskEndDate && editableTask.status !== "Complete") {
      setIsOverdue(true);
    } else {
      setIsOverdue(false);
    }
  };

  // Function format dd/mm/yy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as dd/mm/yy
  };

  // Auto-save task to localStorage whenever the task changes
  useEffect(() => {
    const currentList = JSON.parse(localStorage.getItem("todo") || "[]");
    const updatedList = currentList.map((item: ItemProps) =>
      item.id === editableTask.id ? editableTask : item
    );
    localStorage.setItem("todo", JSON.stringify(updatedList));

    // Check for overdue whenever the task changes
    checkOverdue();
  }, [editableTask]);

  return (
    <>
      {/* The Card */}
      <div className="text-black">
        <div
          className={`cursor-pointer mx-4 mb-4 p-5 bg-white/30 backdrop-blur-md rounded-lg shadow-lg border-l-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl ${
            isOverdue ? "border-red-500 " : "border-gray-300"
          }`}
          onClick={openModal}
        >
          <div className="flex justify-between items-center">
            {/* Task name with conditional strike-through if overdue */}
            <h3
              className={`text-xl font-semibold mb-2 ${
                isOverdue ? "text-red-500 line-through italic" : "text-gray-800"
              }`}
            >
              {task.name}
            </h3>

            {/* Overdue label */}
            {isOverdue && (
              <p className="text-red-500 text-sm font-bold bg-red-100 rounded-full px-2 py-1 shadow-md">
                Overdue
              </p>
            )}
          </div>

          <p className="text-black-500 text-sm">
            <span className="font-medium">From:</span>
            {formatDate(task.formToDate[0])}
            <span className="ml-2 font-medium">To:</span>
            {formatDate(task.formToDate[1])}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              <input
                type="text"
                name="name"
                title="Task Name"
                placeholder=""
                value={editableTask.name}
                className="w-full p-2"
              />
            </h2>
            <textarea
              title="Task Description"
              placeholder=""
              name="description"
              value={editableTask.description}
              className="w-full border border-gray-300 rounded p-2"
            />

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="w-full p-2 border border-gray-300 rounded-lg text-left"
              >
                <span
                  className={`px-2 py-1 rounded-full ${getStatusColor(
                    editableTask.status
                  )}`}
                >
                  {editableTask.status}
                </span>
              </button>
              {statusDropdownOpen && (
                <ul className="absolute w-full mt-2 bg-black/20 backdrop-blur-md rounded-lg">
                  <li
                    className="py-2 px-4 hover:bg-gray-100/30"
                    onClick={() => handleChange("New")}
                  >
                    <span className="px-2 py-1 rounded-full bg-gray-400 text-white">
                      New
                    </span>
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100/30"
                    onClick={() => handleChange("Inprogress")}
                  >
                    <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                      In Progress
                    </span>
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-100/30"
                    onClick={() => handleChange("Complete")}
                  >
                    <span className="px-2 py-1 rounded-full bg-green-500 text-white">
                      Complete
                    </span>
                  </li>
                </ul>
              )}
            </div>

            <p className="mt-2 text-white">
              <span className="font-medium text-white">
                From: {formatDate(editableTask.formToDate[0])}{" "}
              </span>
              <br />
              <span className="font-medium text-white">
                To: {formatDate(editableTask.formToDate[1])}
              </span>
            </p>

            {/* Close button */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Utility function to apply color classes based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-gray-400 text-white";
    case "Inprogress":
      return "bg-blue-500 text-white";
    case "Complete":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};

export default Card;
