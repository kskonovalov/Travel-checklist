import React, { useState } from 'react';
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

interface TodoListProps {
  tasks: taskInterface[];
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  editTask: ({ task, taskId }: { task: string; taskId: string }) => void;
}

interface StyledProps {
  completed: boolean | number;
}

const Task = styled(ListItem)`
  ${(props: StyledProps) =>
    props.completed ? 'text-decoration: line-through;' : ''}
`;

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  toggleTask,
  editTask
}) => {
  /* edit task */
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
              toggleTask(item.id);
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
                handleClickOpen();
              }}
            >
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                deleteTask(item.id);
              }}
            >
              <DeleteIcon color="primary" />
            </ListItemIcon>
            <EditDialog
              open={open}
              editTask={editTask}
              onClose={handleClose}
              task={item.value}
              taskId={item.id}
            />
          </Task>
        );
      })}
    </List>
  );
};

export default TodoList;
