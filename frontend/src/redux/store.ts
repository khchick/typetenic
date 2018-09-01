import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GenericStoreEnhancer } from 'redux';

import { rootReducer, RootState } from './reducers/rootReducer';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (enhancer: GenericStoreEnhancer) => GenericStoreEnhancer;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);

