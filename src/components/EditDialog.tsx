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

import { editTask, editTaskInList } from '../store/actions';

interface IProps {
  open: boolean;
  listId: string;
  task: string;
  taskId: string;
  onClose: () => void;
}

const EditDialog = ({ open, listId, task, taskId, onClose }: IProps) => {
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
            dispatch(
              editTaskInList({ listId, taskId: taskId, taskText: newTaskText })
            );
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
