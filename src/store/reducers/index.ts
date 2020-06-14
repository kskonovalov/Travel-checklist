import { combineReducers } from 'redux';

import tasksReducer from './tasksReducer';
import listIDReducer from './listIDReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  listID: listIDReducer
});

export default rootReducer;
