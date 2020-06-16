import taskInterface from '../../interfaces/taskInterface';

export default interface ITaskAction {
  type: string;
  id?: string;
  task?: string;
  tasks?: taskInterface[];
}
