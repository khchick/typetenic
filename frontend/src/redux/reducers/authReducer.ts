import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, AuthActions} from '../actions/authAction';


export interface AuthState {
    isLoggedIn: boolean;
    token: string;
}

const initialState = {
    isLoggedIn: false,
    token: ''
}

export function authReducer(state: AuthState = initialState, action: AuthActions) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, // don't mutate state
                isLoggedIn: true,
                token: action.token
            }
        // case LOGIN_FAILURE: 
        //     return {
        //         isLoggedIn: false
        //     }
        
        case LOGOUT: 
            return {
                ...state,
                isLoggedIn: false,
                token: action.token
            }
        
        default:
            return state
    }
}