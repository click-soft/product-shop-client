import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface MuiSelectProps {
  object: { [key: string]: string };
  className?: string;
  label: string;
  value?: any;
  onChange?: (value: any) => void;
}

const MuiSelect: React.FC<MuiSelectProps> = (props) => {
  const object = props.object;

  return (
    <FormControl className={props.className} variant="outlined">
      <InputLabel id="input-label">{props.label}</InputLabel>
      <Select
        labelId="input-label"
        value={props.value}
        label={props.label}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {!object && <MenuItem />}
        {object &&
          Object.keys(object)?.map((key) => (
            <MenuItem key={key} value={key}>
              {object[key]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
