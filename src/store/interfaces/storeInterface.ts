import taskInterface from '../../interfaces/taskInterface';

export default interface storeInterface {
  tasks: taskInterface[]; // TODO: remove
  lists: any;
  listID: string;
}
