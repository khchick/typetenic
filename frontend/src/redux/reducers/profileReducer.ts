import { LOCAL_SIGNUP, EDIT_PROFILE, CREATE_MBTI, EDIT_KEY_ATR, ProfileActions} from '../actions/profileAction';


export interface ProfileState {
    email: string,
    password: string,
    profilePic: string,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    key_atr: string,
    key_atr_desc: string,
}

const initialState = {
    email: '',
    password: '',
    profilePic: '',
    name: '',
    date: '',
    gender: '',
    orientation: '',
    location: '',
    mbti: '',
    key_atr: '',
    key_atr_desc: '',
}

export function profileReducer(state: ProfileState = initialState, action: ProfileActions) {
    switch(action.type) {
        case LOCAL_SIGNUP:
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        
        case EDIT_PROFILE: 
            return {
                ...state,
                profilePic: action.profilePic,
                name: action.name,
                date: action.date,
                gender: action.gender,
                orientation: action.orientation,
                location: action.location,
              }

        case CREATE_MBTI: 
            return {
                ...state,
                mbti: action.mbti,
              }

        case EDIT_KEY_ATR: 
            return {
                ...state,
                key_atr: action.key_atr,
                key_atr_desc: action.key_atr_desc,
              }

        default:
            return state
    }
}
