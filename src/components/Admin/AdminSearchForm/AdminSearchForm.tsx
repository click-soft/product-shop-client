import React, { useState } from 'react';
import styles from './AdminSearchForm.module.scss';
import DateRangePicker from '../../../ui/DateRangePicker/DateRangePicker';
import MuiSelect from '../../../ui/MUI/MuiSelect/MuiSelect';
import { Button, TextField } from '@mui/material';
import useGetManagers from '../../../hooks/use-get-managers';
import classNames from 'classnames';
import ChildrenProps from '../../../interfaces/ChildrenProps';

interface AdminSearchFormProps extends ChildrenProps {
  onSubmit: (value: FormValues) => void;
  textLabel: string;
}

const AdminSearchForm: React.FC<AdminSearchFormProps> = (props) => {
  const [manager, setManager] = useState('');
  const { managerObject } = useGetManagers();
  const [formValues, setFormValues] = useState<FormValues>({
    startDate: new Date(),
    endDate: new Date(),
  });

  function dataChangeHandler(startDate: Date, endDate: Date) {
    setFormValues((prev) => {
      return { ...prev, startDate, endDate };
    });
  }

  return (
    <form
      className={classNames(styles.search_wrapper, props.className)}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(formValues);
      }}
    >
      <DateRangePicker
        className={styles.date_picker}
        onDateChange={dataChangeHandler}
      />
      <MuiSelect
        className={styles.select}
        label="담당자"
        object={managerObject}
        value={manager}
        onChange={(value) => {
          setManager(value);
          setFormValues((prev) => {
            return { ...prev, manager: value };
          });
        }}
      />
      <TextField
        className={styles.text}
        label={props.textLabel}
        color="primary"
        onChange={(e) => {
          setFormValues((prev) => {
            return { ...prev, text: e.target.value };
          });
        }}
      />
      {props.children}
      <Button
        className={styles.submit_button}
        variant="contained"
        type="submit"
      >
        조회
      </Button>
    </form>
  );
};

export type FormValues = {
  startDate: Date;
  endDate: Date;
  manager?: string;
  text?: string;
};

export default AdminSearchForm;
