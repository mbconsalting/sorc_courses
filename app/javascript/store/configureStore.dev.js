import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../components/DevTools';

const configureStore = preloadedState => {
  const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, routerMiddleware(browserHistory), createLogger()),
            DevTools.instrument()
        )
    );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;