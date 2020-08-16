import taskInterface from '../../interfaces/taskInterface';

export default interface IStore {
  lists: any; // taskInterface[]
  listId: string;
}
