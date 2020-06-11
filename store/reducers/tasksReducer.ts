import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK } from '../constants';
import ITaskAction from '../interfaces/ITaskAction';
import { getRandomKey } from '../../src/helpers';
import taskInterface from '../../src/interfaces/taskInterface';

const tasksReducer = (state = [], action: ITaskAction) => {
  switch (action.type) {
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
