import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user'
import cartItemsReducer from './cart'

import wineReducer from "./wine"
import winesReducer from "./wines"


const store = configureStore({
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: { 
        user: userReducer, 
        cart_items: cartItemsReducer,
        selectedWine: wineReducer,
        wines: winesReducer
    }
})

export default store