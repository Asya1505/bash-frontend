import { createStore, compose, applyMiddleware } from 'redux';
import { showMiddleware } from './middlewares/middlewares';
import rootReducer from './reducers/index';

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(showMiddleware)
    ),
  );

  return store;
};

export default createAppStore;