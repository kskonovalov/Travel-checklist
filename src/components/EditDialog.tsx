import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';

interface IProps {
  open: boolean;
  onClose: () => void;
  task: string;
}

const EditDialog = ({ onClose, open, task }: IProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Редактировать задачу</DialogTitle>
      <DialogContent>
        <TextField fullWidth={true} value={`${task}`} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
          variant="outlined"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
