import React from 'react';
import { Button, Icon, TextInput } from 'react-materialize';

const AddTask: React.FC = () => {
  return (
    <>
      <TextInput id="TextInput-4" label="Добавить в чеклист" />
      <Button node="button" waves="light">
        Добавить
        <Icon right>send</Icon>
      </Button>
    </>
  );
};

export default AddTask;
