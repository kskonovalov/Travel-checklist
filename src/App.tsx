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
import TabPanel from './components/TabPanel';
import Loader from './components/Loader';
import { getRandomKey, fillWithDefaultLists } from './helpers';
import { setListId, addList, emptyStore } from './store/actions';
import { apiUrl, saveErrorMessage } from './config';
import IStore from './store/interfaces/IStore';
import ErrorMessage from './components/ErrorMessage';

declare global {
  interface Window {
    __DATA__: any;
  }
}
window.__DATA__ = window.__DATA__ || {};

interface IUrlParams {
  listId?: string;
}

const a11yProps = (index: any) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const TabsWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const ListsWrap = styled(Tabs)`
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
  height: 70vh;
`;
const TasksWrap = styled(Box)`
  width: calc(100% - 320px);
  @media (max-width: 768px) {
    width: 100%;
  }
  height: 70vh;
  overflow-y: scroll;
`;

const StyledTab = styled(Tab)`
  min-height: 32px;
`;

const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const lists = useSelector((state: any) => state.lists);

  // set new listId if needed
  const { listId = '' }: IUrlParams = useParams();
  useEffect(() => {
    if (listId.length === 0) {
      // first, checking localStorage
      const savedListID = localStorage.getItem('listId');
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
    dispatch(setListId({ listId }));
  }, [listId]);

  // initial load. get tasks
  useEffect(() => {
    if (initialLoad) {
      dispatch(emptyStore());
      if (listId.length > 0) {
        axios
          .post(
            apiUrl,
            {
              listId,
              action: 'get'
            },
            {
              headers: { 'Content-Type': 'application/json' }
            }
          )
          .then(response => {
            const { data } = response;
            // load lists from api
            if (data.success && typeof data.data === 'object') {
              Object.keys(data.data).map((key: string) => {
                dispatch(
                  addList({
                    listId: key,
                    listTitle: data.data[key].listTitle,
                    tasks: data.data[key].tasks
                  })
                );
              });
            } else {
              // or fill with default tasks in case of api error
              fillWithDefaultLists({ dispatch });
            }
            setInitialLoad(false);
          })
          .catch(e => {
            // fill with default tasks in case of api error
            fillWithDefaultLists({ dispatch });
          });
      }
    }
  }, [listId, initialLoad]);

  // save tasks
  useEffect(() => {
    if (!initialLoad && listId.length > 0) {
      // save in local storage
      localStorage.setItem('lists', JSON.stringify(lists));
      localStorage.setItem('listId', listId);
      // save to api
      setError('');
      axios
        .post(
          apiUrl,
          {
            listId,
            lists,
            action: 'save'
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .catch(e => {
          setError(saveErrorMessage);
        });
    }
  }, [lists]);

  // new list confirmation
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const createNewList = () => {
    localStorage.removeItem('listId');
    localStorage.removeItem('lists');
    setInitialLoad(true);
    history.push(`/`);
  };

  // tabs
  const [tab, setTab] = useState<number | string>(
    typeof Object.keys(lists)[0] !== 'undefined' ? Object.keys(lists)[0] : 0
  );
  const handleTabs = (
    event: React.ChangeEvent<{}>,
    newValue: number | string
  ) => {
    setTab(newValue);
  };
  useEffect(() => {
    if (typeof Object.keys(lists)[0] !== 'undefined') {
      setTab(Object.keys(lists)[0]);
    }
  }, [initialLoad]);

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
              <ListsWrap
                orientation="vertical"
                variant="scrollable"
                value={tab}
                onChange={handleTabs}
                aria-label="Список задач"
              >
                {Object.keys(lists).map((key: any) => {
                  const { listTitle } = lists[key];
                  return (
                    <StyledTab
                      label={listTitle}
                      value={key}
                      key={key}
                      {...a11yProps(key)}
                    />
                  );
                })}
              </ListsWrap>
              <TasksWrap>
                {Object.keys(lists).map((key: any) => {
                  return (
                    <TabPanel value={tab} index={key} key={key}>
                      <TodoList listId={key} />
                      <Box mt={3} mb={1}>
                        <TodoForm listId={key} />
                      </Box>
                    </TabPanel>
                  );
                })}
              </TasksWrap>
            </TabsWrap>
          )}
          <Button variant="outlined" fullWidth={true} onClick={handleClickOpen}>
            Хочу новый лист
          </Button>
          <ConfirmDialog
            open={open}
            onClose={handleClose}
            onConfirm={createNewList}
          />
          {error && <ErrorMessage text={error} />}
        </Container>
      </Box>
    </>
  );
};

export default App;
