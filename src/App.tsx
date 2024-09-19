import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import "./index.css";
import TaskBox from "./Components/TaskBox";

function App() {
  return (
    <>
      <Header className="h-[100px] flex justify-center items-center text-white font-bold text-6xl">
        TO DO LIST
      </Header>
      <Content className="min-h-[80vh] flex justify-between gap-10 p-5">
        <TaskBox title="NEW TASK" color="green" canAddTask={true}/>
        <TaskBox title="INCOMPLETE TASK" color="orange" />
        <TaskBox title="COMPLETE TASK" color="red" />
      </Content>
      <Footer
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          fontSize: "40px",
          fontWeight: "700",
        }}
      >
        We are team 3
      </Footer>
    </>
  );
}

export default App;
