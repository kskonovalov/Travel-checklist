import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Box, Button, Tabs, Tab } from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LinkToList from './components/LinkToList';
import ConfirmDialog from './components/ConfirmDialog';
import Loader from './components/Loader';
import { getRandomKey, maybePrepareTask } from './helpers';
import { setListId, setTasks, addList } from './store/actions';
import { apiUrl, saveErrorMessage } from './config';
import storeInterface from './store/interfaces/storeInterface';
import ErrorMessage from './components/ErrorMessage';

declare global {
  interface Window {
    __DATA__: any;
  }
}
window.__DATA__ = window.__DATA__ || {};

interface IUrlParams {
  listID?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  console.log(value, index);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box maxWidth="sm">{children}</Box>}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const TabsWrap = styled(Box)`
  display: flex;
`;

const fillWithDefaultTasks = ({ dispatch, setTasks }: any) => {
  // const savedTasks = localStorage.getItem('tasks');
  // const defaultTasks =
  //   typeof window.__DATA__.tasks !== 'undefined' ? window.__DATA__.tasks : [];
  // if (savedTasks !== null) {
  //   // or fill with local saved tasks
  //   dispatch(setTasks({ tasks: JSON.parse(savedTasks) }));
  // } else {
  //   // or fill with default tasks
  //   dispatch(setTasks({ tasks: defaultTasks }));
  // }
};

const fillWithDefaultLists = ({ dispatch }: any) => {
  // const savedLists = localStorage.getItem('lists');
  const defaultLists =
    typeof window.__DATA__.lists !== 'undefined' ? window.__DATA__.lists : {};

  Object.keys(defaultLists).map((key: string) => {
    dispatch(
      addList({
        listID: getRandomKey(),
        listTitle: key,
        tasks: defaultLists[key].reduce(function(
          result: any,
          item: any,
          index: any,
          array: any
        ) {
          result[getRandomKey()] = maybePrepareTask(item); //a, b, c
          return result;
        },
        {})

        // .map((item: string | object) => {
        //   return getRandomKey(): maybePrepareTask(item);
        // })
      })
    );
  });

  // if (savedLists !== null) {
  //   // or fill with local saved tasks
  //   dispatch(setTasks({ tasks: JSON.parse(savedLists) }));
  // } else {
  //   // or fill with default tasks
  //   dispatch(setTasks({ tasks: defaultLists }));
  // }
};

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fillWithDefaultLists({ dispatch });
  }, []);

  // set new listID if needed
  const { listID = '' }: IUrlParams = useParams();
  useEffect(() => {
    if (listID.length === 0) {
      // first, checking localStorage
      const savedListID = localStorage.getItem('listID');
      if (savedListID !== null) {
        history.replace(`/${savedListID}`);
        return;
      }
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
  // const tasks = useSelector((state: storeInterface) => state.tasks);
  // useEffect(() => {
  //   if (listID.length > 0) {
  //     axios
  //       .post(
  //         apiUrl,
  //         {
  //           listID,
  //           action: 'get'
  //         },
  //         {
  //           headers: { 'Content-Type': 'application/json' }
  //         }
  //       )
  //       .then(response => {
  //         const { data } = response;
  //         // load tasks from api
  //         if (data.success && data.data.length > 0) {
  //           dispatch(setTasks({ tasks: data.data }));
  //         } else {
  //           // or fill with default tasks in case of api error
  //           fillWithDefaultTasks({ dispatch, setTasks });
  //         }
  //         setInitialLoad(false);
  //       })
  //       .catch(e => {
  //         // fill with default tasks in case of api error
  //         fillWithDefaultTasks({ dispatch, setTasks });
  //       });
  //   }
  // }, [listID]);
  //
  // // save tasks
  // useEffect(() => {
  //   if (!initialLoad && listID.length > 0) {
  //     // save in local storage
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //     localStorage.setItem('listID', listID);
  //     // save to api
  //     setError('');
  //     axios
  //       .post(
  //         apiUrl,
  //         {
  //           listID,
  //           tasks,
  //           action: 'save'
  //         },
  //         {
  //           headers: { 'Content-Type': 'application/json' }
  //         }
  //       )
  //       .catch(e => {
  //         setError(saveErrorMessage);
  //       });
  //   }
  // }, [tasks]);

  // new list confirmation
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // tabs
  const [tab, setTab] = useState<number | string>(0);
  const handleTabs = (
    event: React.ChangeEvent<{}>,
    newValue: number | string
  ) => {
    console.log(newValue);
    setTab(newValue);
  };

  const lists = useSelector((state: any) => state.lists);

  return (
    <>
      <Box mt={5} mb={5}>
        <Container maxWidth="md">
          <Box mt={1} mb={1}>
            <LinkToList />
          </Box>
          {initialLoad ? (
            <Loader loadingMessage="Список задач загружается.." />
          ) : (
            <TabsWrap>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tab}
                onChange={handleTabs}
                aria-label="Vertical tabs example"
              >
                {Object.keys(lists).map((key: any) => {
                  const { listTitle } = lists[key];
                  return (
                    <Tab
                      label={listTitle}
                      value={key}
                      key={key}
                      {...a11yProps(key)}
                    />
                  );
                })}
              </Tabs>
              {Object.keys(lists).map((key: any) => {
                return (
                  <TabPanel value={tab} index={key} key={key}>
                    <TodoList listId={key} />
                  </TabPanel>
                );
              })}
            </TabsWrap>
          )}
          <Box mt={3} mb={1}>
            <TodoForm />
          </Box>
          <Button variant="outlined" fullWidth={true} onClick={handleClickOpen}>
            Хочу новый лист
          </Button>
          <ConfirmDialog open={open} onClose={handleClose} />
          {error && <ErrorMessage text={error} />}
        </Container>
      </Box>
    </>
  );
};

export default App;
