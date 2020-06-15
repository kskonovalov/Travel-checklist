import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import {
  Delete as DeleteIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
  Edit as EditIcon
} from '@material-ui/icons';

import EditDialog from './EditDialog';
import taskInterface from '../interfaces/taskInterface';
import editTaskInterface from '../interfaces/editTaskInterface';
import { deleteTask, editTaskAsync, toggleTask } from '../store/actions';

interface ITasks {
  tasks: taskInterface[];
}

interface StyledProps {
  completed: boolean | number;
}

const Task = styled(ListItem)`
  ${(props: StyledProps) =>
    props.completed ? 'text-decoration: line-through;' : ''}
`;

const TodoList: React.FC = () => {
  const tasks = useSelector((state: ITasks) => state.tasks);
  const dispatch = useDispatch();

  /* edit task */
  const [open, setOpen] = useState<boolean>(false);
  const [currentEditingTask, setCurrentEditingTask] = useState<
    editTaskInterface
  >({
    task: '',
    taskId: ''
  });

  const handleClose = () => {
    setOpen(false);
    setCurrentEditingTask({ task: '', taskId: '' });
  };

  return (
    <List>
      {tasks.map(item => {
        return (
          <Task
            key={item.id}
            button
            completed={item.completed ? 1 : 0}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              dispatch(
                editTaskAsync({
                  id: item.id,
                  task: item.value,
                  completed: item.completed
                })
              );
            }}
          >
            <ListItemIcon>
              {item.completed ? (
                <CheckBoxIcon color="primary" />
              ) : (
                <CheckBoxOutlineBlankIcon color="primary" />
              )}
            </ListItemIcon>
            <ListItemText primary={item.value} />
            <ListItemIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentEditingTask({ task: item.value, taskId: item.id });
                setOpen(true);
              }}
            >
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                dispatch(deleteTask({ id: item.id }));
              }}
            >
              <DeleteIcon color="primary" />
            </ListItemIcon>
          </Task>
        );
      })}
      <EditDialog
        open={open}
        onClose={handleClose}
        task={currentEditingTask.task}
        taskId={currentEditingTask.taskId}
      />
    </List>
  );
};

export default TodoList;
