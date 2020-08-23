import taskInterface from '../../interfaces/taskInterface';

export default interface IStore {
  lists: {
    [listID: string]: {
      listTitle: string;
      tasks: {
        [taskID: string]: taskInterface;
      };
    };
  };
  listId: string;
}
