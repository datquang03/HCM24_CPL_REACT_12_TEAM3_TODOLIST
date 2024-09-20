import React from "react";
import AddTaskButton from "./AddTaskButton";

interface TaskBoxProps {
  title: string;
  color: string;
  onSubmitCallback: () => void;
  canAddTask?: boolean;
  children?: React.ReactNode;
}

const TaskBox: React.FC<TaskBoxProps> = ({
  title,
  color,
  onSubmitCallback,
  canAddTask,
  children,
}) => {
  return (
    <div className={`${color} flex-grow w-1/3 rounded-xl`}>
      <div className="text-white text-4xl font-black italic p-4 ">{title}</div>
      {canAddTask && <AddTaskButton onSubmitCallback={onSubmitCallback} />}
      <div>
        {children} {/* Render the children prop */}
      </div>
    </div>
  );
};

export default TaskBox;
