import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Box, Button } from '@material-ui/core';
import axios from 'axios';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LinkToList from './components/LinkToList';
import ConfirmDialog from './components/ConfirmDialog';
import Loader from './components/Loader';
import taskInterface from './interfaces/taskInterface';
import { getRandomKey } from './helpers';
import useHttp from './hooks/http.hook';

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
  const [tasks, setTasks] = useState<taskInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      // trying to create user-friendly list name
      if (words.length > 0) {
        // Shuffle array
        const shuffled = words.sort(() => 0.5 - Math.random());
        // Get sub-array of first 3 elements after shuffled
        const selected = shuffled.slice(0, 3);
        newListID = selected.join('-');
      }
      // in case of fail, just create random key
      if (newListID.length === 0) {
        newListID = getRandomKey(13);
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

  // get checklist from api
  const { request } = useHttp();
  const getTasks = async (listID: string) => {
    const apiUrl = 'https://flynow.ru/checklist/';
    if (listID.length > 0) {
      try {
        const data = await request('https://flynow.ru/checklist/', 'POST', {
          listID
        });
        console.log(data);
      } catch (e) {}
      // if (data.length > 0) {
      //   setTasks(data);
      //   setLoading(false);
      // }
    }
  };
  useEffect(() => {
    setLoading(true);
    const data = getTasks(listID);
    console.log(data);
    setLoading(false);
  }, [listID]);

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
            <LinkToList />
          </Box>
          <Box mt={3} mb={1}>
            <TodoForm addTask={addTask} />
          </Box>
          {loading ? (
            <Loader loadingMessage="Список задач загружается.." />
          ) : (
            <Box mt={1} mb={1}>
              <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
              />
            </Box>
          )}
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
