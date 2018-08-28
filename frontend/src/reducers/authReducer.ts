import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, AuthActions} from '../actions/authAction';


export interface AuthState {
    isLoggedIn: boolean
}

const initialState = {
    isLoggedIn: false
}

export function authReducer(state: AuthState = initialState, action: AuthActions) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state, // don't mutate state
                isLoggedIn: true
            }
        // case LOGIN_FAILURE: 
        //     return {
        //         isLoggedIn: false
        //     }
        
        case LOGOUT: 
            return {
                ...state,
                isLoggedIn: false
            }
        
        default:
            return state
    }
}