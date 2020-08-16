import { SET_LIST_ID } from '../constants';

const listIdReducer = (state = '', action: any) => {
  switch (action.type) {
    case SET_LIST_ID:
      return action.listId;
    default:
      return state;
  }
};

export default listIdReducer;
