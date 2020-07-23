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
      console.log(state);
      console.log(action);
      return {
        ...state,
        [action.listID]: {
          listTitle: action.listTitle,
          tasks: action.tasks
        }
      };
    // .map(
    //     (item: taskInterface): taskInterface => {
    //       return action.id === item.id
    //           ? {
    //             ...item,
    //             completed: !item.completed
    //           }
    //           : item;
    //     }

    default:
      return state;
  }
};

export default listsReducer;
