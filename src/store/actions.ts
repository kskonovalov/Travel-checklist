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
  completed?: boolean;
}

export const addTask = ({ task }: ITask): ITaskAction => ({
  type: ADD_TASK,
  task
});

export const addTaskAsync = ({ task }: ITask) => {
  return (dispatch: any, getState: any) => {
    const id: string = getRandomKey();
    dispatch(addTask({ task, id }));
    const { listID } = getState();
    axios
      .post(
        apiUrl,
        {
          listID,
          task,
          id,
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

export const editTaskAsync = ({
  id,
  task = undefined,
  completed = undefined
}: ITask) => {
  return (dispatch: any, getState: any) => {
    if (typeof task !== 'undefined') {
      dispatch(editTask({ task, id }));
    }
    if (typeof completed !== 'undefined') {
      dispatch(toggleTask({ id }));
    }
    const { listID } = getState();

    axios
      .post(
        apiUrl,
        {
          listID,
          task,
          completed: completed !== undefined ? !completed : completed,
          id,
          action: 'edit'
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
