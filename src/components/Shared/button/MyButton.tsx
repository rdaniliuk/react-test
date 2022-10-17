import React from 'react';
import classes from './MyButton.module.css';

interface MyButtonProps {
  onClick: () => void;
}

const MyButton = ({ onClick }: MyButtonProps) => {
  return (
    <button onClick={onClick} className={classes.button}>
      click
    </button>
  );
};

export default MyButton;
