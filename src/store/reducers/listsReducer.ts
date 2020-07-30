import {
  ADD_LIST,
  TOGGLE_TASK_IN_LIST,
  DELETE_TASK_IN_LIST,
  EDIT_TASK_IN_LIST
} from '../constants';
import taskInterface from '../../interfaces/taskInterface';
// import { getRandomKey } from '../../helpers';
// import ITaskAction from '../interfaces/ITaskAction';
// import taskInterface from '../../interfaces/taskInterface';

const listsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        [action.listID]: {
          listTitle: action.listTitle,
          tasks: action.tasks
        }
      };
    case TOGGLE_TASK_IN_LIST:
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tasks: {
            ...state[action.listId].tasks,
            [action.taskId]: {
              ...state[action.listId].tasks[action.taskId],
              completed: !state[action.listId].tasks[action.taskId].completed
            }
          }
        }
      };
    case DELETE_TASK_IN_LIST:
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tasks: Object.keys(state[action.listId].tasks)
            .filter(currentId => currentId !== action.taskId)
            .reduce((obj: any, key) => {
              obj[key] = state[action.listId].tasks[key];
              return obj;
            }, {})
        }
      };
    case EDIT_TASK_IN_LIST:
      return {
        ...state,
        [action.listId]: {
          ...state[action.listId],
          tasks: {
            ...state[action.listId].tasks,
            [action.taskId]: {
              ...state[action.listId].tasks[action.taskId],
              value: action.taskText
            }
          }
        }
      };
    default:
      return state;
  }
};

export default listsReducer;
