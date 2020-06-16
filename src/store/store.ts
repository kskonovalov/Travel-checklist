import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import storeInterface from './interfaces/storeInterface';

declare global {
  interface Window {
    __DATA__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
window.__DATA__ = window.__DATA__ || {};

const initialState: storeInterface = {
  tasks: [],
  listID: ''
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();

const store = createStore(
  rootReducer,
  initialState as any,
  compose(applyMiddleware(thunk), enhancer)
);

export default store;
