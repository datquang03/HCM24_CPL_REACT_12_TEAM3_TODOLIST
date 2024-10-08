import { useState } from "react";
import { Button, DatePicker, Form, FormProps, Input, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";

import ItemProps from "../Model/ItemProps";

interface ItemsFormProps {
  setIsOpen: (isOpen: boolean) => void;
  onSubmitCallback: () => void;
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

const ItemsForm: React.FC<ItemsFormProps> = ({
  setIsOpen,
  onSubmitCallback,
}) => {
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
    const currentDate = new Date();
    const endDate = values.formToDate[1];

    // Kiểm tra tạo một task với ngày kết thúc trong quá khứ
    if (!endDate || new Date(endDate) < currentDate) {
      Modal.error({
        title: "Error",
        content: "End date cannot be in the past or not chosen!", // Thông báo lỗi
      });
      return; // Ngăn việc submit form
    }
    const currentList = localStorage.getItem("items");
    const items = currentList ? JSON.parse(currentList) : [];
    values.id = uuidv4();
    values.status = "New";
    items.push(values);
    localStorage.setItem("items", JSON.stringify(items));
    setIsOpen(false);
    onSubmitCallback();
  };

  return (
    <div>
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
          <Input className="bg-white" />
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
          <Input.TextArea className="bg-white flex-grow" />
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
          <Button className="" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItemsForm;
