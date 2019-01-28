import * as actionType from '../actionTypes/listTypes';


export const selectList = list => {
    return {
        type: actionType.LIST_SELECTED,
        payload: list
    }
}