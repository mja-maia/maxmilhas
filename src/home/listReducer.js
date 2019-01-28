const INITIAL_STATE = {
    flight_list: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FLIGHT_SEARCHED':
            return {
                ...state, flight_list: action.payload
            }
        default:
            return state
    }
}