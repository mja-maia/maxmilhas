import { combineReducers } from 'redux'
import flightReducer from './store/reducers/flight'
import listReducer from './store/reducers/list'


const rootReducer = combineReducers({
    flight: flightReducer,
    list: listReducer
})

export default rootReducer
