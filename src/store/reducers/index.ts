import { combineReducers } from 'redux';

import listsReducer from './listsReducer';
import listIdReducer from './listIdReducer';

const rootReducer = combineReducers({
  listId: listIdReducer,
  lists: listsReducer
});

export default rootReducer;
