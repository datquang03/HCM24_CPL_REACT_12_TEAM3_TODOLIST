import { DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { dateFormatList } from '../utils/dateFormat';

interface DateRangeProps {
  onDateChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
  dateData: [string, string]; // Start and end date strings
}

const DateRange: React.FC<DateRangeProps> = ({ onDateChange, dateData }) => {
  const [startValue, setStartValue] = useState<Dayjs | null>(dayjs(dateData[0]));
  const [endValue, setEndValue] = useState<Dayjs | null>(dayjs(dateData[1]));
  const [endOpen, setEndOpen] = useState(false);

  useEffect(() => {
    setStartValue(dayjs(dateData[0]));
    setEndValue(dayjs(dateData[1]));
  }, [dateData]);

  const disabledStartDate = (startValue: Dayjs | null) => {
    if (!startValue || !endValue) return false;
    return startValue.isAfter(endValue);
  };

  const disabledEndDate = (endValue: Dayjs | null) => {
    if (!endValue || !startValue) return false;
    return endValue.isBefore(startValue);
  };

  const handleStartChange = (value: Dayjs | null) => {
    setStartValue(value);
    onDateChange(value, endValue);
  };

  const handleEndChange = (value: Dayjs | null) => {
    setEndValue(value);
    onDateChange(startValue, value);
  };

  const handleStartOpenChange = (open: boolean) => {
    if (!open) setEndOpen(true);
  };

  const handleEndOpenChange = (open: boolean) => {
    setEndOpen(open);
  };

  return (
    <div className='space-y-2'>
      <div>
        <span className="text-white font-medium text-sm">Start Date</span>
        <DatePicker
        className="w-full mt-1"
            disabledDate={disabledStartDate}
            format={dateFormatList[0]}
            value={startValue}
            placeholder="Start Date"
            onChange={handleStartChange}
            onOpenChange={handleStartOpenChange}
        />
      </div>
      <div>  
        <span className="text-white font-medium text-sm">Due Date</span>
        <DatePicker
            className="w-full mt-1"
            disabledDate={disabledEndDate}
            format={dateFormatList[0]}
            value={endValue}
            placeholder="Due Date"
            onChange={handleEndChange}
            open={endOpen}
            onOpenChange={handleEndOpenChange}
        />
      </div>

    </div>
  );
};

export default DateRange;
