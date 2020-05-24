import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import taskInterface from './interfaces/taskInterface';
import NavBar from './components/NavBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const getRandomKey = (): string => {
  return Math.random()
    .toString(36)
    .substring(7);
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<taskInterface[]>([]);

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
      <NavBar />
      <Container>
        <Box mt={5} mb={5}>
          <Typography variant="h4" component="h1" align="center">
            Tasks list created with React + TypeScript + Material UI
          </Typography>
          <Container maxWidth="sm">
            <Box mt={1} mb={1}>
              <TodoForm addTask={addTask} />
            </Box>
            <Box mt={1} mb={1}>
              <TodoList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask}></TodoList>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default App;
