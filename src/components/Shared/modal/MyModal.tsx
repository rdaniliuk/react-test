import React from 'react';
import classes from './MyModal.module.css';

interface ModalProps {
  children: React.ReactNode;
}

export function MyModal({ children }: ModalProps) {
  return (
    <>
      <div className={classes.backDrop} />
      <div className={classes.modal}>
        <h1>MODAL</h1>
        {children}
      </div>
    </>
  );
}
