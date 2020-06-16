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
import {
  addTaskAsync,
  setListId,
  setTasks,
  setTasksAsync
} from './store/actions';
import { apiUrl } from './config';
import { IStore } from './store/store';

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
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  const words =
    typeof window.__DATA__.words !== 'undefined' ? window.__DATA__.words : [];

  const defaultTasks =
    typeof window.__DATA__.tasks !== 'undefined' ? window.__DATA__.tasks : [];

  const params: IUrlParams = useParams();
  const { listID: paramListId } = params;

  const listID = useSelector((state: IStore) => state.listID);

  const history = useHistory();
  // set new listID if needed
  const dispatch = useDispatch();
  const tasks = useSelector((state: IStore) => state.tasks);
  useEffect(() => {
    dispatch(setListId({ listID }));
    if (listID.length === 0) {
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
      // save in DB on initial load
      dispatch(setTasksAsync({ tasks }));
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

  // get tasks
  useEffect(() => {
    if (listID.length > 0) {
      setApiLoading(true);
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
          if (data.success) {
            dispatch(setTasks({ tasks: data.data }));
            // setTasks(data.data);
          }
          setTasksLoading(false);
          setApiLoading(false);
          setInitialLoad(false);
        });
    }
  }, [listID]);

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
          {tasksLoading ? (
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
