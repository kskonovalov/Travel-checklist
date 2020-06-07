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
  task: string;
  taskId: string;
  editTask: ({ task, taskId }: { task: string; taskId: string }) => void;
  onClose: () => void;
}

const EditDialog = ({ open, task, taskId, editTask, onClose }: IProps) => {
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
        <TextField fullWidth={true} defaultValue={`${task}`} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            editTask({ task, taskId });
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
