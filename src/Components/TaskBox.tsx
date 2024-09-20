import React from "react";
import AddTaskButton from "./AddTaskButton";

interface TaskBoxProps {
  title: string;
  color: string;
  canAddTask?: boolean;
  children?: React.ReactNode;
}

const TaskBox: React.FC<TaskBoxProps> = ({ title, color, canAddTask, children }) => {
  return (
    <div className={`${color} flex-grow w-1/3 rounded-xl`}>
      <div className="text-white text-4xl font-black italic p-4 ">{title}</div>
      {canAddTask && <AddTaskButton />}
      <div>
        {children} {/* Render the children prop */}
      </div>
    </div>
  );
};

export default TaskBox;
