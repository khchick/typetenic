import { LOCAL_SIGNUP, EDIT_PROFILE, CREATE_MBTI, EDIT_KEY_ATR, ProfileActions} from '../actions/profileAction';


export interface ProfileState {
    email: string,
    password: string,
    profilePic: string,
    imageData: any,
    name: string,
    date: string,
    gender: string,
    orientation: string,
    location: string,
    mbti: string,
    key_atr: string,
    key_atr_desc: string,
    energy: string,
    information: string,
    decision: string,
    lifestyle: string
}

const initialState = {
    email: '',
    password: '',
    profilePic: '',
    imageData: null,
    name: '',
    date: '',
    gender: '',
    orientation: '',
    location: '',
    mbti: '',
    key_atr: '',
    key_atr_desc: '',
    energy: '',
    information: '',
    decision: '',
    lifestyle: ''
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
                imageData: action.imageData,
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
                energy: action.energy,
                information: action.information,
                decision: action.decision,
                lifestyle: action.lifestyle
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
