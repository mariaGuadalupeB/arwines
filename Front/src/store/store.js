import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user'
import cartReducer from './cart'

import wineReducer from "./wine"
import winesReducer from "./wines"


const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: { // aca va todo nuestro estados 
        user: userReducer, // es user reducer van a ir todas las cosas que van a ir dentro de user
        cart: cartReducer,
        selectedWine: wineReducer,
        wines: winesReducer,
    }
})

export default store