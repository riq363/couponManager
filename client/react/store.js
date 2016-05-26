import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';
import promiseMiddleware from 'redux-promise';

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(logger, thunk, promiseMiddleware))
export default store;
