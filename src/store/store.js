import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { authReducer } from '../reducers/authReducer'

//activa extenciones devtools y middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//se agrega los reducers para mandarlos al store
const reducers = combineReducers({
    auth: authReducer
})

export const store = createStore(
    reducers,
    //para trabajar con acciones async
    composeEnhancers(
        applyMiddleware(thunk)
    ),
    //para trabajar acciones sync
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)