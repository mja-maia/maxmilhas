import { combineReducers } from 'redux'
import listReducer from './../home/listReducer'

const rootReducer = combineReducers({
    list: listReducer
})

export default rootReducer