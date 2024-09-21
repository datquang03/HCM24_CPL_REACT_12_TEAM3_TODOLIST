import { useEffect, useState } from "react";
import ItemProps from "../Model/ItemProps";
import TaskDropDown from "./TaskDropdown";
import {  message } from "antd";
import { Dayjs } from 'dayjs';
import DateRange from "./DateRange";


interface CardProps {
  task: ItemProps; // Accept a single task
  setDraggedTask: (task: ItemProps | null) => void; // Callback for setting dragged task
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (updatedTask: ItemProps) => void;
}

const Card = ({ task, setDraggedTask, handleDeleteTask, handleUpdateTask }: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editableTask, setEditableTask] = useState<ItemProps>(task);
  const [isOverdue, setIsOverdue] = useState(false); // kiem tra thoi gian task

  const handleEditTask = (id: string) => {
    message.success(`Edit task with id: ${id}`);
  };

  const handleDateChange = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    // Update the editable task's date range when it changes
    setEditableTask({
      ...editableTask,
      formToDate: [startDate?.toISOString() ?? editableTask.formToDate[0], endDate?.toISOString() ?? editableTask.formToDate[1]],
    });
  };

  

  // Open the modal and set the task as editableTask
  const openModal = () => {
    setEditableTask(task);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle drag start
  const handleDragStart = () => {
    setDraggedTask(task); // Set the dragged task
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
          draggable={true} // Make the card draggable
          onDragStart={handleDragStart} // Handle drag start
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

                    <div className="flex items-center">
                      {/* Overdue label */}
                      {isOverdue && (
                      <p className="text-red-500 text-sm font-bold bg-red-100 rounded-full px-2 py-1 shadow-md">
                          Overdue
                      </p>
                      )}
                      <div>
                          <TaskDropDown onDelete={handleDeleteTask} onEdit={handleEditTask} taskId={task.id}/>
                      </div>
                    </div>
                </div>

                <p className="text-black-500 text-sm">
                    <span className="font-medium mr-1">From:</span>
                    {formatDate(task.formToDate[0])}
                    <span className="ml-2 font-medium mr-1">To:</span>
                    {formatDate(task.formToDate[1])}
                </p>
            </div>
        </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 w-96 shadow-lg">
            {/* Status */}
            <div className="relative py-2 text-white font-semibold flex justify-center w-full space-x-2">
              
              <span className="rounded-lg">
                <span
                  className={`px-2 py-1 rounded-full ${getStatusColor(
                    editableTask.status
                  )}`}
                >
                  {editableTask.status}
                </span>
              </span>
              <span>
                {isOverdue && (
                  <span className="text-red-500 text-sm font-bold bg-red-100 rounded-full px-2 py-1 shadow-md">
                    Overdue
                  </span>
                )}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-4">       
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-xs text-orange-500">
                  To-do
                </span>
                <input
                  title="Task Name"
                  placeholder=""
                  type="text"
                  name="name"
                  defaultValue={editableTask.name}
                  className="text-black w-full p-2 rounded pl-12" // Add left padding for space
                  onChange={(e) =>
                    setEditableTask({ ...editableTask, name: e.target.value })
                  }
                />
              </div>    
            </h2>
            <label className="text-white font-medium text-sm">
              Description
              <textarea
                title="Task Description"
                placeholder=""
                name="description"
                defaultValue={editableTask.description}
                className="w-full border border-gray-300 text-black rounded p-2"
                onChange={(e) =>
                  setEditableTask({ ...editableTask, description: e.target.value })
                }              />
            </label>

            

            <div className="mt-2 text-white space-y-4">
              <DateRange onDateChange={handleDateChange} dateData={editableTask.formToDate} />
            </div>

            {/* Close button */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 transition"
                onClick={() => {
                  closeModal();
                  handleUpdateTask(editableTask)
                }}
              >
                Apply
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
