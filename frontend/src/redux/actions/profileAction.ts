import axios from 'axios';
import { Dispatch } from 'redux';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';
import App from '../../App';
import {loginSuccess, loginFailure} from './authAction';

// action types

export const LOCAL_SIGNUP = 'LOCAL_SIGNUP';
export type LOCAL_SIGNUP = typeof LOCAL_SIGNUP;

export const EDIT_PROFILE = 'EDIT_PROFILE';
export type EDIT_PROFILE = typeof EDIT_PROFILE;

export const CREATE_MBTI = 'CREATE_MBTI';
export type CREATE_MBTI = typeof CREATE_MBTI;

export const EDIT_KEY_ATR = 'EDIT_KEY_ATR';
export type EDIT_KEY_ATR = typeof EDIT_KEY_ATR;

export const SUBMIT_PROFILE = 'SUBMIT_PROFILE';
export type SUBMIT_PROFILE = typeof SUBMIT_PROFILE;

// action creators

export interface SignupAction {
    type: LOCAL_SIGNUP,
    email: string,
    password: string
}

function signupSuccess(email: string, password: string) {
    return {
        type: LOCAL_SIGNUP,
        email,
        password
    }
}

export interface EditProfileAction {
    type: EDIT_PROFILE,
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
}

function editProfileSuccess(
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    ) {
    return {
        type: EDIT_PROFILE,
        profilePic,
        name,
        date,
        gender,
        orientation,
        location,
    }
}

export interface CreateMbtiAction {
    type: CREATE_MBTI,
    mbti: string,
}

function createMbtiSuccess(mbti: string) {
    return {
        type: CREATE_MBTI,
        mbti,
    }
}

export interface EditKeyAtrAction {
    type: EDIT_KEY_ATR,
    mbti: string,
    key_atr: string,
    key_atr_desc: string,
}

function editKeyAtrSuccess(key_atr: string, key_atr_desc: string) {
    return {
        type: EDIT_KEY_ATR,
        key_atr,
        key_atr_desc,
    }
}

// not necessary
export interface SubmitProfileAction {
    type: EDIT_PROFILE,
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    keyAtr: string, 
    keyDesc: string
}

function submitProfileSuccess(
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    keyAtr: string, 
    keyDesc: string
    ) {
    return {
        type: EDIT_PROFILE,
        profilePic,
        name,
        date,
        gender,
        orientation,
        location,
        mbti,
        keyAtr, 
        keyDesc
    }
}

export type ProfileActions = SignupAction | EditProfileAction | CreateMbtiAction | EditKeyAtrAction | SubmitProfileAction; 

// dispatch the action creators

export function signupUser(email: string, password: string) {   
    return (dispatch: Dispatch) => {
        console.log('sigining up')
        return axios
            .post<{ token: string }>(
            `${Config.API_SERVER}/api/signup`, 
                {
                    email: email,
                    password: password
                }
            )
            .then(res => {
                if (res.data.token) {
                    AsyncStorage.setItem('token', res.data.token) // save token in AsyncStorage
                    dispatch(signupSuccess(email, password)); // save user data in store
                    dispatch(loginSuccess()); // change isLoggedIn to true
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
  }


export function editProfile(
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    ) {   
    return (dispatch: Dispatch) => {
        dispatch(editProfileSuccess(
            profilePic,
            name,
            date,
            gender,
            orientation,
            location,
        ));              
    }
}

export function createMbti(mbti: string) {   
    return (dispatch: Dispatch) => {
        dispatch(createMbtiSuccess(mbti));              
    }
}

export function editKeyAtr(
    key_atr: string,
    key_atr_desc: string,
    ) {   
    return (dispatch: Dispatch) => {
        dispatch(editKeyAtrSuccess(
            key_atr,
            key_atr_desc,
        ));              
    }
}

// on finishing signup 
export function submitProfile(
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    key_atr: string,
    key_atr_desc: string,
    ) {
    return (dispatch: Dispatch) => {
    // let token =  AsyncStorage.getItem('token')
    AsyncStorage.getItem('token')
    .then((token) => {        
        console.log(token)
        return axios
            .post<{ token: string }>(
            `${Config.API_SERVER}/api/myprofile`, 
                {
                    profilePic: profilePic,
                    display_name: name,
                    dob: date,
                    gender: gender,
                    orientation: orientation,
                    location: location,
                    mbti: mbti,
                    key_atr: key_atr,
                    key_atr_desc: key_atr_desc,
                },{
                    headers: {
                    Authorization: 'Bearer ' + token
                    }
                }
            )
        }) 
        .then(res => {
            if (res.data == null) {
                dispatch(loginFailure('Unexpected error'));
            } else {        
                dispatch(loginSuccess());
                App.loginApp();
            }
        })
        .catch(err => {
                console.log(err);
            })
        }
}