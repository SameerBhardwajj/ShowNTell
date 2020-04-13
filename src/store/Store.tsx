import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import CombinedReducer from '../reducer/CombinedReducer';
import logger from 'redux-logger';

const enhancer = compose(applyMiddleware(thunk, logger));
const store = createStore(CombinedReducer, enhancer);

export {store};
