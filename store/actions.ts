import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './constants';
import ITaskAction from './interfaces/ITaskAction';

interface ITask {
  task?: string;
  id?: string;
}

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
