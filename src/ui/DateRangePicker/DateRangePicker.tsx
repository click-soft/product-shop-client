import React, { useEffect, useState } from 'react';
import styles from './DateRangePicker.module.scss';
import DatePicker from 'react-datepicker';

interface DateRangePickerProps {
  label?: string;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (startDate && endDate) {
      props.onDateChange(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.container}>
      {props.label}
      <div className={styles.dtp_range_container}>
        <DatePicker
          className={styles.date_picker}
          dateFormat="yyyy.MM.dd" // 날짜 형태
          minDate={new Date('2000-01-01')}
          maxDate={new Date()}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          todayButton="Today"
        />
        ~
        <DatePicker
          className={styles.date_picker}
          dateFormat="yyyy.MM.dd" // 날짜 형태
          minDate={new Date('2000-01-01')}
          maxDate={new Date()}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          todayButton="Today"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
