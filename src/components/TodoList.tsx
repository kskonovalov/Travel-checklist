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
import {
  deleteTask,
  deleteTaskInList,
  toggleTask,
  toggleTaskInList
} from '../store/actions';

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

type TList = {
  listId: string;
};

const TodoList: React.FC<TList> = ({ listId }) => {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => {
    return listId in state.lists ? state.lists[listId] : false;
  });

  const { listTitle, tasks } = list;

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

  if (tasks.length === 0) {
    return null;
  }

  return (
    <>
      <b>{listTitle}</b>
      <List>
        {Object.keys(tasks).map((key: any) => {
          const { completed, value } = tasks[key];
          return (
            <Task
              key={key}
              button
              completed={completed ? 1 : 0}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                dispatch(
                  toggleTaskInList({
                    listId,
                    taskId: key
                  })
                );
              }}
            >
              <ListItemIcon>
                {completed ? (
                  <CheckBoxIcon color="primary" />
                ) : (
                  <CheckBoxOutlineBlankIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={value} />
              <ListItemIcon
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentEditingTask({ task: value, taskId: key });
                  setOpen(true);
                }}
              >
                <EditIcon color="primary" />
              </ListItemIcon>
              <ListItemIcon
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(
                    deleteTaskInList({
                      listId,
                      taskId: key
                    })
                  );
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
          listId={listId}
        />
      </List>
    </>
  );
};

export default TodoList;
