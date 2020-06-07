import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';

import editTaskInterface from '../interfaces/editTaskInterface';

interface IProps {
  open: boolean;
  task: string;
  taskId: string;
  editTask: ({ task, taskId }: editTaskInterface) => void;
  onClose: () => void;
}

const EditDialog = ({ open, task, taskId, editTask, onClose }: IProps) => {
  const [newTaskText, setNewTaskText] = useState<string>('');

  useEffect(() => {
    setNewTaskText(task);
  }, [task]);

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
        <TextField
          fullWidth={true}
          value={newTaskText}
          onChange={e => {
            setNewTaskText(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            editTask({ task: newTaskText, taskId });
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
