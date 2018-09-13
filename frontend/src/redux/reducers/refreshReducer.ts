import { CREATE_REQUEST, CREATE_CONNECT, RESPOND_RECEIVED_REQUEST, CHANGE_SENT_REQUEST, CHANGE_TYPE_DECK, CHANGE_TEN_DECK, CHANGE_NOTIFICATION, RefreshActions } from '../actions/refreshAction';


export interface RefreshState {
    receivedList: Array<any>,
    sentList: Array<any>,
    nonSuggestedList: Array<any>,
    suggestedList: Array<any>,
    typeDeckList: Array<any>,
    tenDeckList: Array<any>,
    notificationList: Array<any>
}

const initialState = {
    receivedList: [],
    sentList: [],
    nonSuggestedList: [],
    suggestedList: [],
    typeDeckList: [],
    tenDeckList: [],
    notificationList: []
}

export function refreshReducer(state: RefreshState = initialState, action: RefreshActions) {
    switch (action.type) {

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

        case CHANGE_TYPE_DECK:
            return {
                ...state,
                typeDeckList: action.user,
            }

        case CHANGE_TEN_DECK:
            return {
                ...state,
                tenDeckList: action.user,
            }

        case CHANGE_NOTIFICATION:
            return {
                ...state,
                notificationList: action.user,
            }

        default:
            return state
    }
}