import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './../reducers/ui';
import authReducer from './../reducers/auth';
import stoOrdersReducer from '../reducers/stoOrders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      ui: uiReducer,
      auth: authReducer,
      stoOrders: stoOrdersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
