import React from 'react';
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

interface TodoTimeProps {
  setTodoTime: (dateStrings: [string, string]) => void;
}

const SelectTime: React.FC<TodoTimeProps> = ({ setTodoTime }) => {
  const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    console.log('Selected Dates:', dates);
    console.log('Formatted Dates:', dateStrings);
    setTodoTime([dateStrings[0], dateStrings[1]]);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={handleDateChange} />
    </Space>
  );
};

export default SelectTime;