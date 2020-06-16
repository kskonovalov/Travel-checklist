import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Box, Button } from '@material-ui/core';
import axios from 'axios';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LinkToList from './components/LinkToList';
import ConfirmDialog from './components/ConfirmDialog';
import Loader from './components/Loader';
import { getRandomKey } from './helpers';
import { setListId, setTasks } from './store/actions';
import { apiUrl } from './config';
import storeInterface from './store/interfaces/storeInterface';

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
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const params: IUrlParams = useParams();

  // set new listID if needed
  const { listID = '' } = params;
  useEffect(() => {
    if (listID.length === 0) {
      const words =
        typeof window.__DATA__.words !== 'undefined'
          ? window.__DATA__.words
          : [];
      // get 3 random words from array to create some-travel-slug (user-friendly list name)
      const newListID =
        words.length > 0
          ? // get 3 random words from array to create some-travel-slug (user-friendly list name)
            words
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .join('-')
          : // or just create random slug
            getRandomKey(13);
      history.replace(`/${newListID}`);
    }
    dispatch(setListId({ listID }));
  }, [listID]);

  // initial load. get tasks
  const tasks = useSelector((state: storeInterface) => state.tasks);
  useEffect(() => {
    if (listID.length > 0) {
      setTasksLoading(true);
      axios
        .post(
          apiUrl,
          {
            listID,
            action: 'get'
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then(response => {
          const { data } = response;
          // save tasks from db, if presents
          if (data.success && data.data.length > 0) {
            dispatch(setTasks({ tasks: data.data }));
          } else {
            // or fill with default tasks
            const defaultTasks =
              typeof window.__DATA__.tasks !== 'undefined'
                ? window.__DATA__.tasks
                : [];
            dispatch(setTasks({ tasks: defaultTasks }));
          }
          setTasksLoading(false);
          setInitialLoad(false);
        });
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

  // save tasks
  useEffect(() => {
    if (!initialLoad && listID.length > 0) {
      axios.post(
        apiUrl,
        {
          listID,
          tasks,
          action: 'save'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }, [tasks]);

  return (
    <>
      <Box mt={5} mb={5}>
        <Container maxWidth="sm">
          <Box mt={1} mb={1}>
            <LinkToList />
          </Box>
          <Box mt={3} mb={1}>
            <TodoForm />
          </Box>
          {initialLoad || tasksLoading ? (
            <Loader loadingMessage="Список задач загружается.." />
          ) : (
            <Box mt={1} mb={1}>
              <TodoList />
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
