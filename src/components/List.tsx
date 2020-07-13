import React from 'react';

type TList = {
  listTitle: string;
  tasks: any;
};

const List: React.FC<TList> = ({ listTitle, tasks }) => {
  return (
    <>
      <p>
        <strong>{listTitle}</strong>
      </p>
      <ul>
        {Object.keys(tasks).map(key => {
          return <li key={key}>{tasks[key]}</li>;
        })}
      </ul>
    </>
  );
};

export default List;
