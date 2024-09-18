import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.css";
import "./index.css";
import { useState } from "react";
const { RangePicker } = DatePicker;
import { Button, DatePicker, Form, FormProps, Input } from "antd";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function App() {
  const [componentVariant, setComponentVariant] =
    useState<FormProps["variant"]>("filled");

  const onFormVariantChange = ({
    variant,
  }: {
    variant: FormProps["variant"];
  }) => {
    setComponentVariant(variant);
  };
  return (
    
    <>
      <Header
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "40px",
          fontWeight: "700",
        }}
      >
        TO DO LIST
      </Header>
      <Content
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div className="input-form">
          <h1
            style={{
              fontSize: "40px",
              paddingBottom: "20px",
              fontWeight: "700",
            }}
          >
            To Do Form
          </h1>
          <Form
            {...formItemLayout}
            onValuesChange={onFormVariantChange}
            variant={componentVariant}
            style={{ maxWidth: 600 }}
            
            initialValues={{ variant: componentVariant }}
          >
            <Form.Item
              label="Name"
              name="name"
              value = {form.name}
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please type some in description field!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Date"
              name="formToDate"
              rules={[{ required: true, message: "Please choose!" }]}
            >
              <RangePicker />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit()}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
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
