import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import { theme } from '../config';

const FormFieldsWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

interface TodoFormProps {
  addTask: (task: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(title);
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
