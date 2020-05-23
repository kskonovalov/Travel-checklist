import React from 'react';
import 'materialize-css';
import {
  TextInput,
  Collection,
  CollectionItem,
  Button,
  Icon,
} from 'react-materialize';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const App: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 1,
      text: 'Test task',
      done: false,
    },
    {
      id: 2,
      text: 'Other task',
      done: true,
    },
  ];

  return (
    <div className="container">
      <TextInput id="TextInput-4" label="Добавить в чеклист" />
      <Button node="button" waves="light">
        Добавить
        <Icon right>cloud</Icon>
      </Button>
      <Collection>
        {tasks.map((item) => {
          return (
            <CollectionItem key={item.id} href="">
              {item.text}
            </CollectionItem>
          );
        })}
      </Collection>
    </div>
  );
};

export default App;
