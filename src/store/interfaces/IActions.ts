import taskInterface from '../../interfaces/taskInterface';

export interface IActionType {
  type: string;
}

export interface ICommonAction {
  listId: string;
}

export interface IListAction extends ICommonAction {
  listTitle?: string;
  tasks?: taskInterface[];
}

export interface ITaskAction extends ICommonAction {
  taskId?: string;
  taskText?: string;
}
