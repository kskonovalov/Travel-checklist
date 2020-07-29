import { combineReducers } from 'redux';

import listsReducer from './listsReducer';
import listIDReducer from './listIDReducer';

const rootReducer = combineReducers({
  listID: listIDReducer,
  lists: listsReducer
});

export default rootReducer;
