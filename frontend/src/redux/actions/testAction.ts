import axios from 'axios';
import { Dispatch } from 'redux';
import { AsyncStorage } from 'react-native';
import Config from 'react-native-config';


// action types

export const DO_TEST1 = 'DO_TEST1';
export type DO_TEST1 = typeof DO_TEST1;

export const DO_TEST2 = 'DO_TEST2';
export type DO_TEST2 = typeof DO_TEST2;

export const DO_TEST3 = 'DO_TEST3';
export type DO_TEST3 = typeof DO_TEST3;

export const DO_TEST4 = 'DO_TEST4';
export type DO_TEST4 = typeof DO_TEST4;


// action creators

export interface Test1Action {
    type: DO_TEST1,
    test1: string,
}

export interface Test2Action {
    type: DO_TEST2,
    test2: string,
}

export interface Test3Action {
    type: DO_TEST3,
    test3: string,
}

export interface Test4Action {
    type: DO_TEST4,
    test4: string,
}


function doMbtiTest1(test1: string) {
    return {
        type: DO_TEST1,
        test1
    }
}

function doMbtiTest2(test2: string) {
    return {
        type: DO_TEST2,
        test2
    }
}

function doMbtiTest3(test3: string) {
    return {
        type: DO_TEST3,
        test3
    }
}

function doMbtiTest4(test4: string) {
    return {
        type: DO_TEST4,
        test4
    }
}

export type TestActions = Test1Action | Test2Action | Test3Action | Test4Action;


// dispatch the action creators

export function one(test1: string) {   
    return (dispatch: Dispatch) => {
        dispatch(doMbtiTest1(test1));             
    }
}

export function two(test2: string) {   
    return (dispatch: Dispatch) => {
        dispatch(doMbtiTest2(test2));             
    }
}

export function three(test3: string) {   
    return (dispatch: Dispatch) => {
        dispatch(doMbtiTest3(test3));             
    }
}

export function four(test4: string) {   
    return (dispatch: Dispatch) => {
        dispatch(doMbtiTest4(test4));             
    }
}



//  vv this will overwrite previous test
// export function mbtiTest(
//     test1: string,
//     test2: string,
//     test3: string,
//     test4: string,
//     ) {   
//     return (dispatch: Dispatch) => {
//         dispatch(doMbtiTest(
//             test1,
//             test2,
//             test3,
//             test4
//         ));             
//     }
// }