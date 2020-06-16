import taskInterface from '../../interfaces/taskInterface';

export default interface storeInterface {
  tasks: taskInterface[];
  listID: string;
}
