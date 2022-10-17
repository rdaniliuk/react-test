import React from 'react';
import classes from './MyInput.module.css';

interface MyInputProps {
  onChange: (value: string) => void;
  value?: string;
}

const MyInput = ({ onChange, value }: MyInputProps) => {
  return (
    <input
      data-testid="input-element"
      className={classes.myInput}
      value={value}
      placeholder="search product..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></input>
  );
};

export default MyInput;
