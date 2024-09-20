import React from "react";
import AddTaskButton from "./AddTaskButton";

interface TaskBoxProps {
  title: string;
  color: string;
  onSubmitCallback: () => void;
  onDrop: () => void; // Accept onDrop callback
  canAddTask?: boolean;
  children?: React.ReactNode;
}

const TaskBox: React.FC<TaskBoxProps> = ({
  title,
  color,
  onSubmitCallback,
  onDrop,
  canAddTask,
  children,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent default to allow dropping
  };

  return (
    <div
      className={`${color} flex-grow w-1/3 rounded-xl`}
      onDragOver={handleDragOver}
      onDrop={onDrop} // Handle drop event
    >
      <div className="text-white text-4xl font-black italic p-4">{title}</div>
      {canAddTask && <AddTaskButton onSubmitCallback={onSubmitCallback} />}
      <div>{children}</div> {/* Render the children prop */}
    </div>
  );
};

export default TaskBox;
