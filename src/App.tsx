import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import "./index.css";
import TaskBox from "./Components/TaskBox";
import { useEffect, useState } from "react";
import Card from "./Components/Card";
import ItemProps from "./Model/ItemProps";
import { updateTodo } from "./utils/updateToDo";
import handleFilter from "./data/filterTodo";
import FilterTodo from "./Components/FilterTodo";

function App() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [draggedTask, setDraggedTask] = useState<ItemProps | null>(null); // Track dragged task

  //Phan nay filter nha mn
  //nhap ten
  const [todoName, setTodoName] = useState("");
  //chon ngay
  const [todoTime, setTodoTime] = useState<[string, string]>(["", ""]);
  const [filteredItems, setFilteredItems] = useState<ItemProps[]>([]);

  //

  const updateItemsFromLocalStorage = () => {
    const currentList = localStorage.getItem("items");
    const items = currentList ? JSON.parse(currentList) : [];
    setItems(items);
    setFilteredItems(items);
  };

  //handle delete task
  const handleDeleteTask = (taskId: string) => {
    const updatedItems = items.filter((item) => item.id !== taskId);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  //handle update task
  const handleUpdateTask = (updatedItem: ItemProps) => {
    updateTodo(updatedItem, items);
    updateTodo(updatedItem, filteredItems);
    updateItemsFromLocalStorage();
  };

  useEffect(() => {
    updateItemsFromLocalStorage();
  }, []);

  const handleTaskDrop = (newStatus: "New" | "Inprogress" | "Complete") => {
    if (!draggedTask) {
      console.error("No task is being dragged.");
      return;
    }
    // Prevent moving from "Inprogress" to "New"
    if (
      (draggedTask.status === "Inprogress" && newStatus === "New") ||
      (draggedTask.status === "Complete" && newStatus === "New")
    ) {
      alert("Tasks cannot move back from '" + draggedTask.status + "' to 'New'.");
      return;
    }
    const updatedItems = items.map((item) =>
      item.id === draggedTask.id ? { ...item, status: newStatus } : item
    );
    console.log(updatedItems); // Log to check updated items
    setItems(updatedItems);
    setFilteredItems(updatedItems);

    localStorage.setItem("items", JSON.stringify(updatedItems));
    setDraggedTask(null); // Clear draggedTask after drop
  };

  //filter khi click button
  const onFilter = () => {
    const result = handleFilter(items, todoName, todoTime); // Lọc dựa trên todoName và todoTime
    setFilteredItems(result);
  };

  // Filter tasks based on their status
  const newTasks = (filteredItems ?? []).filter(
    (item) => item.status === "New"
  );
  const inProgressTasks = (filteredItems ?? []).filter(
    (item) => item.status === "Inprogress"
  );
  const completedTasks = (filteredItems ?? []).filter(
    (item) => item.status === "Complete"
  );

  return (
    <>
      <Header className="w-full h-[100px] flex justify-center items-center text-white font-bold text-6xl">
        TO DO LIST
      </Header>
      <FilterTodo
        todoName={todoName}
        setTodoName={setTodoName}
        setTodoTime={setTodoTime}
        onFilter={onFilter}
      />
      <Content className="min-h-[80vh] flex justify-between gap-10 p-5">
        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="NEW TASK"
          color="bg-green-400"
          canAddTask={true}
          onDrop={() => handleTaskDrop("New")}
        >
          {newTasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              setDraggedTask={setDraggedTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          ))}
        </TaskBox>

        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="INPROGRESS TASK"
          color="bg-orange-400"
          onDrop={() => handleTaskDrop("Inprogress")}
        >
          {inProgressTasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              setDraggedTask={setDraggedTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          ))}
        </TaskBox>

        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="COMPLETE TASK"
          color="bg-red-400"
          onDrop={() => handleTaskDrop("Complete")}
        >
          {completedTasks.map((task) => (
            <Card
              key={task.id}
              task={task}
              setDraggedTask={setDraggedTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          ))}
        </TaskBox>
      </Content>
      <Footer className="h-[100px] flex justify-center items-center text-black font-bold text-6xl">
        We are team 3
      </Footer>
    </>
  );
}

export default App;
