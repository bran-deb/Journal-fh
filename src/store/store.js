import { createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers/authReducer'

//se agrega los reducers para mandarlos al store
const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(reducers)