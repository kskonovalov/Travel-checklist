import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core';

import { EDIT_TASK } from '../store/constants';

interface IProps {
  open: boolean;
  task: string;
  taskId: string;
  onClose: () => void;
}

const EditDialog = ({ open, task, taskId, onClose }: IProps) => {
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = useState<string>('');

  useEffect(() => {
    setNewTaskText(task);
  }, [task]);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Редактировать задачу</DialogTitle>
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
        <Button onClick={onClose} color="primary">
          Отменить
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: EDIT_TASK, id: taskId, task: newTaskText });
            onClose();
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
