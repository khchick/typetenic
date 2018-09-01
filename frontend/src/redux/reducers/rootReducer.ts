import {combineReducers} from 'redux';

// add reducers here
import {authReducer, AuthState} from './authReducer';
import {profileReducer, ProfileState} from './profileReducer';
import {testReducer, TestState} from './testReducer';

export interface RootState {
    auth: AuthState,
    profile: ProfileState,
    test: TestState
}

export const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    test: testReducer
})