import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
            label="Task title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </FormFieldsWrap>
      </form>
    </ThemeProvider>
  );
};

export default TodoForm;
