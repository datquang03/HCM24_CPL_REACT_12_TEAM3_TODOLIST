import { Content, Footer, Header } from "antd/es/layout/layout";
import ItemsForm from "./Components/ItemsForm";
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <Header className="h-[100px] flex justify-center items-center text-white font-bold text-4xl">
        TO DO LIST
      </Header>
      <Content className="min-h-[80vh] flex justify-between gap-5 p-5">
        <ItemsForm />
        <div className="column new-task bg-green-400 ">
          <div className="title">New Task</div>
        </div>
        <div className="column incomplete-task bg-orange-400">
          <div className="title bg-">Incomplete Task</div>
        </div>
        <div className="column complete-task bg-red-400">
          <div className="title">Complete Task</div>
        </div>
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
