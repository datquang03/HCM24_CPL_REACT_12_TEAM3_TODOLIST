import { useState } from "react";
import { Button, DatePicker, Form, FormProps, Input } from "antd";
import ItemProps from "../Model/item";

const { RangePicker } = DatePicker;
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

const ItemsForm = () => {
  const [componentVariant, setComponentVariant] =
    useState<FormProps["variant"]>("filled");

  const onFormVariantChange = ({
    variant,
  }: {
    variant: FormProps["variant"];
  }) => {
    setComponentVariant(variant);
  };

  const handleSubmit: FormProps<ItemProps>["onFinish"] = (values) => {
    const currentList = localStorage.getItem("items");
    const items = currentList ? JSON.parse(currentList) : [];
    items.push(values);
    localStorage.setItem("items", JSON.stringify(items));
  };

  return (
    <div>
      <h1>To Do Form</h1>
      <Form
        {...formItemLayout}
        onValuesChange={onFormVariantChange}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant }}
        onFinish={handleSubmit}
      >
        <Form.Item<ItemProps>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ItemProps>
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

        <Form.Item<ItemProps>
          label="Date"
          name="formToDate"
          rules={[{ required: true, message: "Please choose!" }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItemsForm;