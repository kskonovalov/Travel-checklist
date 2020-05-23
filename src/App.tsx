import React, { useState } from 'react';
import 'materialize-css';
import { Collection, CollectionItem, Checkbox } from 'react-materialize';

import AddTask from './components/AddTask';

type Task = {
  id: number;
  value: string;
  completed: boolean;
};

const getRandomKey = (): string => {
  return Math.random().toString(36).substring(7);
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      value: 'Test task',
      completed: false,
    },
    {
      id: 2,
      value: 'Other task',
      completed: true,
    },
  ]);

  const addTask = (task: string) => {
    setTasks((prev: Task[]) => [
      ...prev,
      {
        id: getRandomKey(),
        value: task,
        completed: false,
      },
    ]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.filter((item: Task): boolean => {
        return taskId !== item.id;
      })
    );
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map(
        (item: Task): Task => {
          return taskId === item.id
            ? {
                ...item,
                completed: !item.completed,
              }
            : item;
        }
      )
    );
  };

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
