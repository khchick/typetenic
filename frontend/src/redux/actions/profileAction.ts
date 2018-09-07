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
    id: number,
    max_age: number,
    min_age: number,
    token: number,
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
}

export function editProfileSuccess(
    id: number,
    max_age: number,
    min_age: number,
    token: number,
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    ) {
    return {
        type: EDIT_PROFILE,
        id,
        max_age,
        min_age,
        token,
        profilePic,
        imageData,
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
    energy: string,
    information: string,
    decision: string,
    lifestyle: string 
}

function createMbtiSuccess(mbti: string, energy: string, information: string, decision: string, lifestyle: string ) {
    return {
        type: CREATE_MBTI,
        mbti,
        energy,
        information,
        decision,
        lifestyle
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

export interface SubmitProfileAction {
    type: SUBMIT_PROFILE,
    imageData: any,
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
    imageData: any,
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
        imageData,
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
        console.log(`${Config.API_SERVER}/api/signup`)
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
                    dispatch(loginSuccess(res.data.token)); // change isLoggedIn to true
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
  }


export function editProfile(
    id: number,
    max_age: number,
    min_age: number,
    token: number,
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    ) {   
    return (dispatch: Dispatch) => {
        dispatch(editProfileSuccess(
            id,
            max_age,
            min_age,
            token,
            profilePic,
            imageData,
            name,
            date,
            gender,
            orientation,
            location,
        ));              
    }
}

export function createMbti(mbti: string, energy: string, information: string, decision: string, lifestyle: string) {   
    return (dispatch: Dispatch) => {
        dispatch(createMbtiSuccess(mbti, energy, information, decision, lifestyle));              
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
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    key_atr: string,
    key_atr_desc: string,
    imageData: any,
    ) {
    return (dispatch: Dispatch) => {    
    AsyncStorage.getItem('token')
    .then((token) => {      
        let profileData = new FormData();
        profileData.append('display_name', name); // key/value pairs 
        profileData.append('dob', date); 
        profileData.append('gender', gender); 
        profileData.append('orientation', orientation); 
        profileData.append('location', location); 
        profileData.append('mbti', mbti); 
        profileData.append('key_atr', key_atr); 
        profileData.append('key_atr_desc', key_atr_desc); 
        profileData.append('profile_pic', imageData);

        return axios
        .post<{ token: string }>(
        `${Config.API_SERVER}/api/user/myprofile`, 
            profileData
            ,{
            headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
            }
            }
        )
    }) 
    .then(res => {
        console.log(res)
        if (res.data == null) {
            dispatch(loginFailure('Unexpected error'));
        } else {
            dispatch(submitProfileSuccess(name, date, gender, orientation, location, mbti, key_atr, key_atr_desc, imageData))       
            dispatch(loginSuccess(res.data.token));
            App.loginApp(res.data.token);
        }
    })
    .catch(err => {
            console.log(err);
        })
    }
}


// get profile
export function getUserProfile(token: string| null) {   
    return (dispatch: Dispatch) => {
        console.log('running getUserProfile')
        return axios
            .get(`${Config.API_SERVER}/api/user/myprofile`, {
                headers: {
                Authorization: "Bearer " + token
                }
            })
            .then(res => {
                // dispatch edit profile
                dispatch(editProfileSuccess(res.data[0].id, res.data[0].max_age, res.data[0].min_age, res.data[0].token, res.data[0].profile_pic, res.data[0].imageData, res.data[0].display_name, res.data[0].dob, res.data[0].gender, res.data[0].orientation, res.data[0].location))
                return res.data[0]       
            })
            .catch(err => {
                console.log(err);
            })
    }
  }

