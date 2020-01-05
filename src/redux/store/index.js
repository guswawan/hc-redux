import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import Thunk from 'redux-thunk'

import rootReducer from '../reducers'

const logger = createLogger({});
// const enhancers = applyMiddleware(logger, rpm);
const store = createStore(
    rootReducer,
    applyMiddleware(logger, promiseMiddleware, Thunk)
);


export default store;
