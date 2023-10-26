import React, { useEffect, useState } from 'react';
import styles from './DateRangePicker.module.scss';
import classNames from 'classnames';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface DateRangePickerProps {
  label?: string;
  onDateChange: (startDate: Date, endDate: Date) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (startDate && endDate) {
      props.onDateChange(startDate, endDate);
    }
  }, [startDate, endDate]);

  const startDatePicker = createDatePicker(dayjs(), setStartDate);
  const endDatePicker = createDatePicker(dayjs(), setEndDate);
  return (
    <div className={styles.container}>
      {props.label}
      <div className={classNames(styles.dtp_range_container, props.className)}>
        {startDatePicker}~{endDatePicker}
      </div>
    </div>
  );
};

const createDatePicker = (value: dayjs.Dayjs, onChangeCallback: (date: Date) => void) => {
  return (
    <DatePicker
      className={styles.date_picker}
      defaultValue={dayjs(value)}
      format="YYYY-MM-DD"
      slotProps={{
        actionBar: { actions: ['today', 'accept'] },
      }}
      onChange={(value) => {
        if (dayjs(value).isValid()) {
          onChangeCallback(dayjs(value).toDate());
        }
      }}
    />
  );
};

export default DateRangePicker;
