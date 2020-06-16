import taskInterface from '../../interfaces/taskInterface';

export default interface storeInterface {
  tasks: taskInterface[] | any;
  listID: string;
}
