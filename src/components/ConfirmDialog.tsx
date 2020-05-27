import React from 'react';
import { Dialog, DialogTitle, Button } from '@material-ui/core';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmDialog = ({ onClose, open }: IProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Вы уверены?</DialogTitle>
      <br />
      <br />
      <Button variant="outlined" onClick={handleClose}>
        УДАЛИТЬ старый лист и создать НОВЫЙ
      </Button>
      <br />
      <br />
      <Button variant="outlined" onClick={handleClose}>
        ОТМЕНИТЬ создание нового листа
      </Button>
    </Dialog>
  );
};

export default ConfirmDialog;
