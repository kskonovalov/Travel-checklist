import React from 'react';

import taskInterface from '../interfaces/taskInterface';

type TList = {
  listTitle: string;
  tasks: taskInterface[];
};

const List: React.FC<TList> = ({ listTitle, tasks }) => {
  return (
    <>
      <p>
        <strong>{listTitle}</strong>
      </p>
      <ul>
        {tasks.map(task => {
          return <li key={task.id}>{task.value}</li>;
        })}
      </ul>
    </>
  );
};

export default List;
