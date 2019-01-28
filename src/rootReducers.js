import { combineReducers } from 'redux'
import listReducer from './store/reducers/flight'

const rootReducer = combineReducers({
    list: listReducer
})

export default rootReducer
