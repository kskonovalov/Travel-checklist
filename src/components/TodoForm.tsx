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

  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ADD_TASK, action: { task: title } });
    // addTask(title);
    setTitle('');
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <FormFieldsWrap>
          <TextField
            id="title"
            label="Перед поездкой нужно.."
            value={title}
            fullWidth={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
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
