import { useState } from "react";
import { Button, DatePicker, Form, FormProps, Input } from "antd";
import ItemProps from "../Model/ItemProps";

interface ItemsFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

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

const ItemsForm: React.FC<ItemsFormProps> = ({ setIsOpen }) => {
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
    setIsOpen(false);
  };

  return (
    <div >
      <h1 className="px-4 text-white font-semibold">Add New Task</h1>
      <Form
        {...formItemLayout}
        onValuesChange={onFormVariantChange}
        variant={"outlined"}
        initialValues={{ variant: componentVariant }}
        onFinish={handleSubmit}
      >
        <Form.Item<ItemProps>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Enter Task Name" }]}
        > 
          <Input className="bg-white"/>
        </Form.Item>
        <Form.Item<ItemProps>
          label="Description"
          name="description"
          rules={[
            {
              message: "Please type some in description field!",
            },
          ]}
        >
          <Input.TextArea className="bg-white flex-grow"  />
        </Form.Item>

        <Form.Item<ItemProps>
          label="Date"
          name="formToDate"
          rules={[{ required: true, message: "Please choose!" }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItemsForm;
