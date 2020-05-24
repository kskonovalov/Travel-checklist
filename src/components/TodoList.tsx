import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import taskInterface from '../interfaces/taskInterface';

interface TodoListProps {
  tasks: taskInterface[];
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
}

interface StyledProps {
  completed: boolean;
}

const Task = styled(ListItem)`
  ${(props: StyledProps) =>
    props.completed ? 'text-decoration: line-through;' : ''}
`;

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  toggleTask
}) => {
  return (
    <List>
      {tasks.map(item => {
        return (
          <Task
            key={item.id}
            button
            completed={item.completed}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              toggleTask(item.id);
            }}
          >
            <ListItemIcon>
              {item.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </ListItemIcon>
            <ListItemText primary={item.value} />
            <ListItemIcon
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                deleteTask(item.id);
              }}
            >
              <DeleteIcon />
            </ListItemIcon>
          </Task>
        );
      })}
    </List>
  );
};

export default TodoList;
