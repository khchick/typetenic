import axios from 'axios';
import { Dispatch } from 'redux';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';
import App from '../../App';
import Navigation from '../../screens/components/Navigation';

// action types

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;


// action creators

export interface LoginSuccessAction {
    type: LOGIN_SUCCESS
    token: string
}

export interface LoginFailureAction {
    type: LOGIN_FAILURE
}

export interface LogOutAction {
    type: LOGOUT
}

export type AuthActions = LoginSuccessAction | LoginFailureAction | LogOutAction;


export function loginSuccess(token: string) {
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

export function loginFailure(message: string) {
    return {
        type: LOGIN_FAILURE,
        message: message
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}


// dispatch the action creators

export function loginUser(email: string, password: string) {
    // ts error not assignable ? > because it's function wrapping the actions
    // return (dispatch: Dispatch<AuthActions>) => {    
    return (dispatch: Dispatch) => {
        return axios
            .post<{ token: string; message?: string }>(
            `${Config.API_SERVER}/api/login`, 
                {
                    email: email,
                    password: password
                }
            )
            .then(res => {
                if (res.data == null) {
                    dispatch(loginFailure('Unexpected error'));
                } else if (!res.data.token) {
                    dispatch(loginFailure(res.data.message || ''));
                } else {
                    AsyncStorage.setItem('token', res.data.token) // save token in AsyncStorage
                    dispatch(loginSuccess(res.data.token));
                    App.loginApp(res.data.token);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function loginFacebook(accessToken: string) {
    return (dispatch: Dispatch) => {
        return axios
            .post<{token: string; message?: string}>(
            `${Config.API_SERVER}/api/login/facebook`,
            {
                access_token: accessToken
            })
            .then(res => {
                if (res.data == null) {
                    dispatch(loginFailure('Unexpected error'))
                } else if (!res.data.token) {
                    dispatch(loginFailure(res.data.message || ''))
                } else {
                    AsyncStorage.getItem('token')
                    .then((token) => {
                        if (token) {
                            return (dispatch: Dispatch) => {
                                dispatch(loginSuccess(token))
                                App.loginApp(token);            
                            }
                        }
                        else {
                            AsyncStorage.setItem('token', res.data.token)
                            dispatch(loginSuccess(res.data.token))
                            App.fbAppendProfile();  
                        } 
                    })                                
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export function logoutUser() {
    return (dispatch: Dispatch) => {
        AsyncStorage.removeItem('token')           
        .then(() => {
            dispatch(logout());
            App.initialApp();
        })
    }
}

export async function checkToken() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        return (dispatch: any) => {
            dispatch(loginSuccess(token))
            return token;
        }
    }     
}

