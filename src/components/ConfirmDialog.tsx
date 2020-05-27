import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

interface IProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const ConfirmDialog = ({ onClose, selectedValue, open }: IProps) => {
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
    </Dialog>
  );
};

export default ConfirmDialog;
