import React, { useState } from 'react';
import { Container, Box, TextField } from '@material-ui/core';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import taskInterface from './interfaces/taskInterface';
import { getRandomKey } from './helpers';

declare global {
  interface Window {
    __DATA__: any;
  }
}
console.log(window.__DATA__);
window.__DATA__ = window.__DATA__ || {};
console.log(window.__DATA__);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<taskInterface[]>(
    typeof window.__DATA__.tasks !== 'undefined' ? window.__DATA__.tasks : []
  );

  const [listID, setListID] = useState('uniqlistid');

  // get countries from api
  /*useEffect(() => {
    const apiUrl = 'https://flynow.ru/checklist/';
    axios
      .post(apiUrl, {
        listID
      })
      .then(res => {
        const { data } = res;
        data.data && setCountries(data.data);
      });
  }, [listID]);*/

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
      <Container>
        <Box mt={5} mb={5}>
          <Container maxWidth="sm">
            <Box mt={1} mb={1}>
              <TextField
                id="standard-basic"
                label="Ссылка на Ваш личный чеклист путешественника"
                fullWidth={true}
                value={`${window.location.href}#${listID}`}
              />
            </Box>
            <Box mt={1} mb={1}>
              <TodoForm addTask={addTask} />
            </Box>
            <Box mt={1} mb={1}>
              <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
              ></TodoList>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default App;
