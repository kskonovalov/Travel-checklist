import {
  SET_LIST_ID,
  ADD_LIST,
  DELETE_LIST,
  TOGGLE_TASK_IN_LIST,
  DELETE_TASK_IN_LIST,
  EDIT_TASK_IN_LIST,
  EMPTY_STORE,
  ADD_TASK_TO_LIST
} from './constants';
import ITaskAction from './interfaces/ITaskAction';

interface ITask {
  task?: string;
  id?: string;
  completed?: boolean;
}

// export const deleteTask = ({ id }: ITask): ITaskAction => ({
//   type: DELETE_TASK,
//   id
// });

export const setListId = ({ listID }: { listID: string }) => ({
  type: SET_LIST_ID,
  listID
});

export const addList = ({ tasks, listID, listTitle }: any): any => ({
  type: ADD_LIST,
  listID,
  listTitle,
  tasks
});

export const toggleTaskInList = ({ listId, taskId }: any): any => ({
  type: TOGGLE_TASK_IN_LIST,
  listId,
  taskId
});

export const deleteTaskInList = ({ listId, taskId }: any): any => ({
  type: DELETE_TASK_IN_LIST,
  listId,
  taskId
});

export const editTaskInList = ({ listId, taskId, taskText }: any): any => ({
  type: EDIT_TASK_IN_LIST,
  listId,
  taskId,
  taskText
});

export const addTaskToList = ({ listId, taskText }: any): any => ({
  type: ADD_TASK_TO_LIST,
  listId,
  taskText
});

export const emptyStore = (): any => ({
  type: EMPTY_STORE
});
