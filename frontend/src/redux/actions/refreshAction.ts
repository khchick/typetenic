import axios from 'axios';
import { Dispatch } from 'redux';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';


// action types

export const CREATE_REQUEST = 'CREATE_REQUEST';
export type CREATE_REQUEST = typeof CREATE_REQUEST;

export const CREATE_CONNECT = 'CREATE_CONNECT';
export type CREATE_CONNECT = typeof CREATE_CONNECT;

export const RESPOND_RECEIVED_REQUEST = 'RESPOND_RECEIVED_REQUEST';
export type RESPOND_RECEIVED_REQUEST = typeof RESPOND_RECEIVED_REQUEST;

export const CHANGE_SENT_REQUEST = 'CHANGE_SENT_REQUEST';
export type CHANGE_SENT_REQUEST = typeof CHANGE_SENT_REQUEST;


// action creators

export interface CreateRequestAction {
    type: CREATE_REQUEST,
    user: Array<any>
}

export interface CreateConnectAction {
    type: CREATE_CONNECT,
    user: Array<any>
}

export interface ReceivedRequestAction {
    type: RESPOND_RECEIVED_REQUEST,
    user: Array<any>
}

export interface ChangeSentRequestAction {
    type: CHANGE_SENT_REQUEST,
    user: Array<any>
}



function CreateRequest(user: Array<any>) {
    return {
        type: CREATE_REQUEST,
        user
    }
}

function CreateConnection(user: Array<any>) {
    return {
        type: CREATE_CONNECT,
        user
    }
}

function ChangeReceivedRequest(user: Array<any>) {
    return {
        type: RESPOND_RECEIVED_REQUEST,
        user
    }
}

function ChangeSentRequest(user: Array<any>) {
    return {
        type: CHANGE_SENT_REQUEST,
        user
    }
}

export type RefreshActions = CreateRequestAction | CreateConnectAction | ReceivedRequestAction | ChangeSentRequestAction;


// dispatch the action creators

// on aprove or reject received request
export function handleReceivedReq() {   
    return (dispatch: Dispatch) => {
        AsyncStorage.getItem('token')
        .then((token) => {
            return axios
            .get(`${Config.API_SERVER}/api/connection/request/received`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(res => {
                dispatch(ChangeReceivedRequest(res.data))
            })
        })        
        .catch(err => {
            console.log(err);
        })   
    }
}


export function handleSentReq() {   
    return (dispatch: Dispatch) => {
        AsyncStorage.getItem('token')
        .then((token) => {
            return axios
            .get(`${Config.API_SERVER}/api/connection/request/sent`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(res => {
                dispatch(ChangeSentRequest(res.data))
            })
        })        
        .catch(err => {
            console.log(err);
        })   
    }
}
