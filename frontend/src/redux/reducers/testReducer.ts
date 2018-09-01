import { DO_TEST1, DO_TEST2, DO_TEST3, DO_TEST4, TestActions} from '../actions/testAction';


export interface TestState {
    test1: string,
    test2: string,
    test3: string,
    test4: string,
}

const initialState = {
    test1: '',
    test2: '',
    test3: '',
    test4: '',
}

export function testReducer(state: TestState = initialState, action: TestActions) {
    switch(action.type) {

        case DO_TEST1:
            return {
                ...state,
                test1: action.test1,
            }
        
        case DO_TEST2:
            return {
                ...state,
                test2: action.test2,
            }
        case DO_TEST3:
            return {
                ...state,
                test3: action.test3,
            }
        
        case DO_TEST4:
            return {
                ...state,
                test4: action.test4,
            }

        default:
            return state
    }
}