import React from 'react';
import classes from './Modal.module.css';

const Modal = ({ children }) => {
  return (
    <div className={[classes.Modal, classes.active].join(' ')}>
      <div className={classes.ModalContent}>{children}</div>
    </div>
  );
};

export default Modal;
