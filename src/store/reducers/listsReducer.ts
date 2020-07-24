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
      return Object.keys(state).map((listKey: string) => {
        return listKey === action.listId
          ? {
              ...state[listKey],
              tasks: state[listKey].tasks.map((currentTask: any) => {
                console.log(currentTask);
                return currentTask.id === action.taskId
                  ? {
                      ...currentTask,
                      completed: !currentTask.completed
                    }
                  : currentTask;
              })
            }
          : state[listKey];
      });
    default:
      return state;
  }
};

export default listsReducer;
