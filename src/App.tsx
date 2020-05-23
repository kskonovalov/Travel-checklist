import React from 'react';
import 'materialize-css';
import { Collection, CollectionItem, Checkbox } from 'react-materialize';

import AddTask from './components/AddTask';

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
      <AddTask />
      <Collection>
        {tasks.map((item) => {
          return (
            <CollectionItem key={item.id} href="">
              <Checkbox
                checked={item.done}
                id={`checkbox-${item.id}`}
                label={item.text}
                value={item.text}
                onChange={(e) => {
                  console.log(e.target);
                }}
              />
            </CollectionItem>
          );
        })}
      </Collection>
    </div>
  );
};

export default App;
