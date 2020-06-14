import { SET_LIST_ID } from '../constants';

const listIDReducer = (state = '', action: any) => {
  switch (action.type) {
    case SET_LIST_ID:
      return action.listID;
    default:
      return state;
  }
};

export default listIDReducer;
