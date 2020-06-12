import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import { theme } from '../config';
import { ADD_TASK } from '../store/constants';

const FormFieldsWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ADD_TASK, task: newTask });
    // addTask(title);
    setNewTask('');
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrap>
          <TextField
            id="title"
            label="Перед поездкой нужно&hellip;"
            value={newTask}
            fullWidth={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask(e.target.value);
            }}
          />
          <Button variant="outlined" type="submit">
            Добавить
          </Button>
        </FormFieldsWrap>
      </form>
    </ThemeProvider>
  );
};

export default TodoForm;
