import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { GenericStoreEnhancer } from 'redux';

import { rootReducer, RootState } from '../reducers/rootReducer';
import { AuthActions } from '../actions/authAction';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (enhancer: GenericStoreEnhancer) => GenericStoreEnhancer;
    }
}
  
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<RootState, AuthActions,{},{}>(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);

// export const store = createStore<AuthState, AuthActions,{},{}>(
//     authReducer,
//     applyMiddleware(thunk)
// );
