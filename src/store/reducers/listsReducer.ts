import { ADD_LIST, DELETE_LIST, TOGGLE_TASK_IN_LIST } from '../constants';
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
          tasks: state[action.listId].tasks.map((currentTask: any) => {
            return currentTask.id === action.taskId
              ? {
                  ...currentTask,
                  completed: !currentTask.completed
                }
              : currentTask;
          })
        }
      };
    default:
      return state;
  }
};

export default listsReducer;
