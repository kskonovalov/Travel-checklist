import axios from 'axios';

import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from './constants';
import { apiUrl } from '../config';
import ITaskAction from './interfaces/ITaskAction';

interface ITask {
  task?: string;
  id?: string;
}

export const addTask = ({ task }: ITask) => {
  return (dispatch: any) => {
    // axios
    //   .post(
    //     apiUrl,
    //     {
    //       listID,
    //       tasks,
    //       action: 'save'
    //     },
    //     {
    //       headers: { 'Content-Type': 'application/json' }
    //     }
    //   )
    //   .then(response => {
    //     // const { data } = response;
    //     // setApiLoading(false);
    //   });
    dispatch(addTaskFinished({ task }));
  };
};

export const addTaskFinished = ({ task }: ITask): ITaskAction => ({
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
