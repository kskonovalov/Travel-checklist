import { compose, createStore } from 'redux';

import rootReducer from './reducers';
import taskInterface from '../interfaces/taskInterface';
// import IStore from './interfaces/IStore';

declare global {
  interface Window {
    __DATA__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
window.__DATA__ = window.__DATA__ || {};

interface IStore {
  tasks: taskInterface[] | any;
}

const initialState: IStore = {
  tasks:
    typeof window.__DATA__.tasks !== 'undefined' ? window.__DATA__.tasks : []
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();

const store = createStore(rootReducer, initialState, compose(enhancer));

export default store;
