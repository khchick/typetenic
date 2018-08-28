import {combineReducers} from 'redux';

// add reducers here
import {authReducer, AuthState} from './authReducer';

export interface RootState {
    auth: AuthState
}

export const rootReducer = combineReducers({
    auth: authReducer
})