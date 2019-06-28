import { MODAL_VISIBLE } from '../actions/actionTypes'

const initialState = {
    modalVisible: false
}

export const confirmationModalReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case MODAL_VISIBLE:
            return {
                ...state,
                modalVisible: action.payload
            }
        default:
            return {
                ...state
            }
    }
}