import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  InputAdornment
} from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';

// import axios from 'axios';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ConfirmDialog from './components/ConfirmDialog';
import taskInterface from './interfaces/taskInterface';
import { getRandomKey } from './helpers';

declare global {
  interface Window {
    __DATA__: any;
  }
}
window.__DATA__ = window.__DATA__ || {};

interface IUrlParams {
  listID?: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<taskInterface[]>(
    typeof window.__DATA__.tasks !== 'undefined' ? window.__DATA__.tasks : []
  );

  const words =
    typeof window.__DATA__.words !== 'undefined' ? window.__DATA__.words : [];

  const params: IUrlParams = useParams();
  const { listID: paramListId } = params;

  const listID =
    typeof paramListId !== 'undefined' && paramListId.length > 0
      ? paramListId
      : '';

  const history = useHistory();
  useEffect(() => {
    let newListID = '';
    if (listID.length === 0) {
      if (words.length > 0) {
        // Shuffle array
        const shuffled = words.sort(() => 0.5 - Math.random());
        // Get sub-array of first 3 elements after shuffled
        const selected = shuffled.slice(0, 3);
        newListID = selected.join('-');
      }
      if (newListID.length === 0) {
        newListID = getRandomKey() + getRandomKey() + getRandomKey();
      }
      history.push(`/${newListID}`);
    }
  }, [listID]);

  /* confirmation */
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // get countries from api
  // useEffect(() => {
  //   const apiUrl = 'https://flynow.ru/checklist/';
  //   axios
  //     .post(apiUrl, {
  //       listID
  //     })
  //     .then(res => {
  //       // const { data } = res;
  //       console.log(res);
  //     });
  // }, [listID]);

  const addTask = (task: string) => {
    setTasks(prev => [
      ...prev,
      {
        id: getRandomKey(),
        value: task,
        completed: false
      }
    ]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev =>
      prev.filter((item: taskInterface): boolean => {
        return taskId !== item.id;
      })
    );
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(
        (item: taskInterface): taskInterface => {
          return taskId === item.id
            ? {
                ...item,
                completed: !item.completed
              }
            : item;
        }
      )
    );
  };

  return (
    <>
      <Box mt={5} mb={5}>
        <Container maxWidth="sm">
          <Box mt={1} mb={1}>
            <TextField
              id="standard-basic"
              label="Ссылка на Ваш личный чеклист путешественника"
              fullWidth={true}
              value={`${window.location.href}`}
              helperText="Нажмите, чтобы скопировать"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box mt={3} mb={1}>
            <TodoForm addTask={addTask} />
          </Box>
          <Box mt={1} mb={1}>
            <TodoList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
          </Box>
          <Button variant="outlined" fullWidth={true} onClick={handleClickOpen}>
            Хочу новый лист
          </Button>
          <ConfirmDialog open={open} onClose={handleClose} />
        </Container>
      </Box>
    </>
  );
};

export default App;
