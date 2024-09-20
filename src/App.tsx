import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import "./index.css";
import TaskBox from "./Components/TaskBox";
import ItemProps from "./Model/ItemProps";
import { useEffect, useState } from "react";
import { dataForm } from "./data/todoTest";
import FilterTodo from "./Components/FilterTodo";
import Card from "./Components/Card";

function App() {
  localStorage.setItem('todo',JSON.stringify(dataForm))
  const [items, setItems] = useState<ItemProps[]>([]);
  console.log(items);
  useEffect(() => {
    const currentList = localStorage.getItem("todo");
    const items = currentList ? JSON.parse(currentList) : [];
    setItems(items);
  }, []);

    // Filter tasks based on their status
    const newTasks = items.filter((item) => item.status === "New");
    const inProgressTasks = items.filter((item) => item.status === "Inprogress");
    const completedTasks = items.filter((item) => item.status === "Complete");
  
  return (
    <>
      <Header className="h-[100px] flex justify-center items-center text-white font-bold text-6xl">
        TO DO LIST
      </Header>
      <FilterTodo />
      <Content className="min-h-[80vh] flex justify-between gap-10 p-5">
      <TaskBox title="NEW TASK" color="bg-green-400" canAddTask={true}>
          {newTasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </TaskBox>
        <TaskBox title="IN PROGRESS TASK" color="bg-orange-400">
          {inProgressTasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </TaskBox>
        <TaskBox title="COMPLETE TASK" color="bg-red-400">
          {completedTasks.map((task) => (
            <Card key={task.id} task={task} />
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
