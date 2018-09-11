import { CREATE_REQUEST, CREATE_CONNECT, RESPOND_RECEIVED_REQUEST, CHANGE_SENT_REQUEST, RefreshActions} from '../actions/refreshAction';


export interface RefreshState {
    receivedList: Array<any>,
    sentList: Array<any>,
    nonSuggestedList: Array<any>,
    suggestedList: Array<any>    
}

const initialState = {
    receivedList: [],
    sentList: [],
    nonSuggestedList: [],
    suggestedList: []   
}

export function refreshReducer(state: RefreshState = initialState, action: RefreshActions) {
    switch(action.type) {

        case CREATE_REQUEST:
            return {
                ...state,
                nonSuggestedList: action.user,
            }

        case CREATE_CONNECT:
            return {
                ...state,
                suggestedList: action.user,
            }
        
        case RESPOND_RECEIVED_REQUEST:
            return {
                ...state,
                receivedList: action.user,
            }
        case CHANGE_SENT_REQUEST:
            return {
                ...state,
                sentList: action.user,
            }

        default:
            return state
    }
}