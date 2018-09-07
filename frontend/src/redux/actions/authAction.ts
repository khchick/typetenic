import axios from 'axios';
import { Dispatch } from 'redux';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';
import App from '../../App';
import Navigation from '../../screens/components/Navigation';
import {getUserProfile, editProfileSuccess} from './profileAction';

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
    token: string
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

export function logout(token: string) {
    return {
        type: LOGOUT,
        token: token
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
                    AsyncStorage.setItem('token', res.data.token) // save new token in AsyncStorage
                    dispatch(loginSuccess(res.data.token));
                    dispatch(getUserProfile(res.data.token)); // save profile to redux
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
                    AsyncStorage.setItem('token', res.data.token)
                    // .then((token) => {

                    // })

                        dispatch(loginSuccess(res.data.token));
                        dispatch(getUserProfile(res.data.token)); // save profile to redux
                        App.loginApp(res.data.token);
                    // AsyncStorage.getItem('token')
                    // .then((token) => {
                    //     if (token) {
                    //         return (dispatch: Dispatch) => {
                    //             dispatch(loginSuccess(token))
                    //             App.loginApp(token);            
                    //         }
                    //     }
                    //     else {
                    //         AsyncStorage.setItem('token', res.data.token)
                    //         dispatch(loginSuccess(res.data.token))
                    //         App.fbAppendProfile();  
                    //     } 
                    // })                                
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
            dispatch(logout(''));
            dispatch(editProfileSuccess(0, 0, 0, 0,'','','','','','',''));
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

