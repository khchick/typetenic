import {combineReducers} from 'redux';

// add reducers here
import {authReducer, AuthState} from './authReducer';
import {profileReducer, ProfileState} from './profileReducer';
import {testReducer, TestState} from './testReducer';
import {refreshReducer, RefreshState} from './refreshReducer';


export interface RootState {
    auth: AuthState,
    profile: ProfileState,
    test: TestState,
    refresh: RefreshState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    test: testReducer,
    refresh: refreshReducer
})