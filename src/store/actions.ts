import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SET_LIST_ID,
  SET_TASKS,
  ADD_LIST,
  DELETE_LIST
} from './constants';
import ITaskAction from './interfaces/ITaskAction';

interface ITask {
  task?: string;
  id?: string;
  completed?: boolean;
}

export const setTasks = ({ tasks }: { tasks: ITask[] }) => ({
  type: SET_TASKS,
  tasks
});

export const addTask = ({ task }: ITask): ITaskAction => ({
  type: ADD_TASK,
  task
});

export const editTask = ({ id, task }: ITask): ITaskAction => ({
  type: EDIT_TASK,
  id,
  task
});

export const deleteTask = ({ id }: ITask): ITaskAction => ({
  type: DELETE_TASK,
  id
});

export const toggleTask = ({ id }: ITask): ITaskAction => ({
  type: TOGGLE_TASK,
  id
});

export const setListId = ({ listID }: { listID: string }) => ({
  type: SET_LIST_ID,
  listID
});

export const addList = ({ tasks, listID }: any): any => ({
  type: ADD_LIST,
  listID,
  tasks
});
