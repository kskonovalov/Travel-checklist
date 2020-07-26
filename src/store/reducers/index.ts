import { combineReducers } from 'redux';

// import tasksReducer from './tasksReducer';
import listsReducer from './listsReducer';
import listIDReducer from './listIDReducer';

const rootReducer = combineReducers({
  // tasks: tasksReducer,
  listID: listIDReducer,
  lists: listsReducer
});

export default rootReducer;
