import * as actionType from '../actionTypes/listTypes';

const INITIAL_STATE = {
    selectedList: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LIST_SELECTED:
            return { ...state,
                selectedList: action.payload
            }
        default:
            return state
    }
}