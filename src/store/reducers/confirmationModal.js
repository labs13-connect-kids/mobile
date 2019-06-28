import { MODAL_VISIBLE, GET_INFO, STOP_SEARCH_ME } from '../actions/actionTypes'

const initialState = {
    modalVisible: false,
    info: [],
    queryType: '',
    searchMe: false
}

export const confirmationModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_VISIBLE:
            return {
                ...state,
                modalVisible: action.payload,
                searchMe: false
            }
        case GET_INFO:
            return {
                ...state,
                info: action.payload.key,
                queryType: action.payload.queryType,
                searchMe: true
            }
        case STOP_SEARCH_ME:
            return initialState
        default:
            return {
                ...state
            }
    }
}