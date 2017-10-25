import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const logger = createLogger();
const store = createStore(allReducers,
  {},
  applyMiddleware(thunk, logger)
);

export default store;
