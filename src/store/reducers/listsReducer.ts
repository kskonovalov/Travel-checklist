import { ADD_LIST, DELETE_LIST } from '../constants';
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

    default:
      return state;
  }
};

export default listsReducer;
