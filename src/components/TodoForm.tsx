import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import { theme } from '../config';
import { addTaskToList } from '../store/actions';

const FormFieldsWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 5px 10px;
`;

const StyledButton = styled(Button)`
  width: 300px;
  padding: 5px 10px;
`;

export interface ITodoForm {
  listId: string;
}

const TodoForm: React.FC<ITodoForm> = ({ listId }) => {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.length > 0) {
      dispatch(addTaskToList({ taskText: newTask, listId }));
      setNewTask('');
    }
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
          <StyledButton variant="outlined" type="submit">
            Добавить в список
          </StyledButton>
        </FormFieldsWrap>
      </form>
    </ThemeProvider>
  );
};

export default TodoForm;
