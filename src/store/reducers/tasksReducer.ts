import {
  SET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK
} from '../constants';
import { getRandomKey } from '../../helpers';
import ITaskAction from '../interfaces/ITaskAction';
import taskInterface from '../../interfaces/taskInterface';

const tasksReducer = (state: taskInterface[] = [], action: ITaskAction) => {
  switch (action.type) {
    case SET_TASKS:
      return action.tasks;
    case ADD_TASK:
      return [
        ...state,
        {
          id: getRandomKey(),
          value: action.task,
          completed: false
        }
      ];
    case EDIT_TASK:
      return state.map((item: taskInterface) => {
        return item.id !== action.id
          ? item
          : {
              ...item,
              value: action.task
            };
      });
    case DELETE_TASK:
      return state.filter((item: taskInterface): boolean => {
        return action.id !== item.id;
      });
    case TOGGLE_TASK:
      return state.map(
        (item: taskInterface): taskInterface => {
          return action.id === item.id
            ? {
                ...item,
                completed: !item.completed
              }
            : item;
        }
      );
    default:
      return state;
  }
};

export default tasksReducer;
