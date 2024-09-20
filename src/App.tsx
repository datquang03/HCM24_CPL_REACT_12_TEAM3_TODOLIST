import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import "./index.css";
import TaskBox from "./Components/TaskBox";
import { useEffect, useState } from "react";
// import { dataForm } from "./data/todoTest";
import FilterTodo from "./Components/FilterTodo";
import Card from "./Components/Card";
import ItemProps from "./Model/ItemProps";
import handleFilter from "./data/filterTodo";

function App() {
  // localStorage.setItem("todo", JSON.stringify(dataForm)); // Store the initial tasks
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
    setFilteredItems(items)
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
  if (draggedTask.status === "Inprogress" && newStatus === "New") {
    alert("Tasks cannot move back from 'Inprogress' to 'New'.");
    return;
  }
  const updatedItems = items.map((item) =>
    item.id === draggedTask.id ? { ...item, status: newStatus } : item
  );
  console.log(updatedItems); // Log to check updated items
  setItems(updatedItems);
  localStorage.setItem("items", JSON.stringify(updatedItems));
  setDraggedTask(null); // Clear draggedTask after drop
};

  //filter khi click button
  const onFilter = () => {
    const result = handleFilter(items, todoName, todoTime); // Lọc dựa trên todoName và todoTime
    setFilteredItems(result); 
  };

  // Filter tasks based on their status
  const newTasks = (filteredItems ?? []).filter((item) => item.status === "New");
  const inProgressTasks = (filteredItems ?? []).filter((item) => item.status === "Inprogress");
  const completedTasks = (filteredItems ?? []).filter((item) => item.status === "Complete");

  return (
    <>
      <Header className="h-[100px] flex justify-center items-center text-white font-bold text-6xl">
        TO DO LIST
      </Header>
      <FilterTodo todoName={todoName} todoTime={todoTime} setTodoName={setTodoName} setTodoTime={setTodoTime} onFilter={onFilter}/>
      <Content className="min-h-[80vh] flex justify-between gap-10 p-5">
        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="NEW TASK"
          color="bg-green-400"
          canAddTask={true}
          onDrop={() => handleTaskDrop("New")}
        >
          {newTasks.map((task) => (
            <Card key={task.id} task={task} setDraggedTask={setDraggedTask} />
          ))}
        </TaskBox>

        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="INPROGRESS TASK"
          color="bg-orange-400"
          onDrop={() => handleTaskDrop("Inprogress")}
        >
          {inProgressTasks.map((task) => (
            <Card key={task.id} task={task} setDraggedTask={setDraggedTask} />
          ))}
        </TaskBox>

        <TaskBox
          onSubmitCallback={updateItemsFromLocalStorage}
          title="COMPLETE TASK"
          color="bg-red-400"
          onDrop={() => handleTaskDrop("Complete")}
        >
          {completedTasks.map((task) => (
            <Card key={task.id} task={task} setDraggedTask={setDraggedTask} />
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
