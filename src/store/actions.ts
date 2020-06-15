import axios from 'axios';

import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SET_LIST_ID
} from './constants';
import { apiUrl } from '../config';
import ITaskAction from './interfaces/ITaskAction';
import { getRandomKey } from '../helpers';

interface ITask {
  task?: string;
  id?: string;
}

export const addTask = ({ task }: ITask): ITaskAction => ({
  type: ADD_TASK,
  task
});

export const addTaskAsync = ({ task }: ITask) => {
  return (dispatch: any, getState: any) => {
    const taskId: string = getRandomKey();
    dispatch(addTask({ task, id: taskId }));
    const { listID } = getState();
    axios
      .post(
        apiUrl,
        {
          listID,
          task,
          taskId,
          action: 'add'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .then(response => {
        // const { data } = response;
        console.log(response);
        // setApiLoading(false);
      });
  };
};

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
