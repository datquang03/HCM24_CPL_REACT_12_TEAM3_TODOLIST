import React from "react";
import AddTaskButton from "./AddTaskButton";

interface TaskBoxProps {
  title: string;
  color: string;
  canAddTask?: boolean;
}

const TaskBox: React.FC<TaskBoxProps> = ({ title, color, canAddTask }) => {
  return (
    <div className={`bg-${color}-400 flex-grow w-1/3 rounded-xl`}>
      <div className="text-white text-4xl font-black italic p-4 ">{title}</div>
      {canAddTask && <AddTaskButton />}
    </div>
  );
};

export default TaskBox;
