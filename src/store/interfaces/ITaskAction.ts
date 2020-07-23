import taskInterface from '../../interfaces/taskInterface';

export default interface ITaskAction {
  type: string;
  id?: string;
  listId?: string;
  taskId?: string;
  task?: string;
  tasks?: taskInterface[];
}
