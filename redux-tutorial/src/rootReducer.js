import {combineReducer} from 'redux'
import cartReducer from './Reducers/cart.reducer'

combineReducer({
    cart:cartReducer
})